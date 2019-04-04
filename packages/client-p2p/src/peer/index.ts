// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import PeerInfo from 'peer-info';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-types/messages/types';
import { PeerInterface } from '../types';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import handshake from 'pull-handshake';
import PullPushable, { Pushable } from 'pull-pushable';
import pull from 'pull-stream';
import varint from 'varint';
import decodeMessage, { Status } from '@polkadot/client-types/messages';
import { bufferToU8a, logger, promisify, stringShorten, u8aConcat, u8aToBuffer, u8aToHex } from '@polkadot/util';
import { randomAsU8a } from '@polkadot/util-crypto';

import defaults from '../defaults';

type Connection = {
  connection: LibP2pConnection,
  pushable: Pushable | null
};

const l = logger('p2p/peer');

export default class Peer extends EventEmitter implements PeerInterface {
  bestHash: Uint8Array = new Uint8Array([]);
  bestNumber: BN = new BN(0);
  readonly chain: ChainInterface;
  readonly config: Config;
  readonly id: string;
  private connections: { [index: number]: Connection };
  private nextId: number = 0;
  private nextConnId: number = 0;
  private node: LibP2p;
  readonly peerInfo: PeerInfo;
  readonly shortId: string;

  constructor (config: Config, chain: ChainInterface, node: LibP2p, peerInfo: PeerInfo) {
    super();

    this.chain = chain;
    this.config = config;
    this.connections = {};
    this.id = peerInfo.id.toB58String();
    this.node = node;
    this.peerInfo = peerInfo;
    this.shortId = stringShorten(this.id);

    this.startPing();
  }

  private clearConnection (connId: number): void {
    // delete this.connections[connId];

    // l.debug(() => ['clearConnection', connId, this.shortId, this.isWritable()]);

    // if (!this.isWritable()) {
    //   this.emit('disconnected');
    // }

    this.disconnect();
  }

  private startPing () {
    setTimeout(() => this.ping(), defaults.PING_INTERVAL);
  }

  private async ping (): Promise<boolean> {
    if (!this.node || !this.isActive()) {
      this.startPing();
      return false;
    }

    l.debug(() => `Starting ping with ${this.shortId}`);

    try {
      const connection = await promisify(
        this.node, this.node.dialProtocol, this.peerInfo, defaults.PROTOCOL_PING
      );

      const stream = handshake({ timeout: defaults.WAIT_TIMEOUT }, (error) => {
        if (error) {
          l.warn(() => ['ping disconnected', this.shortId, error]);
          // this.disconnect();
        }
      });
      const shake = stream.handshake;
      const next = () => {
        const start = Date.now();
        const request = u8aToBuffer(randomAsU8a());

        shake.write(request);
        shake.read(defaults.PING_LENGTH, (error, response) => {
          if (!error && request.equals(response)) {
            const elapsed = Date.now() - start;

            l.debug(`Ping from ${this.shortId} ${elapsed}ms`);
          } else {
            if (error) {
              l.warn(`error on reading ping from ${this.shortId}`);
            } else {
              l.warn(`wrong ping received from ${this.shortId}`);
            }

            // this.disconnect();
          }

          shake.abort();

          this.startPing();
        });
      };

      pull(stream, connection, stream);
      next();
    } catch (error) {
      l.error(`error opening ping with ${this.shortId}`);

      return false;
    }

    return true;
  }

  addConnection (connection: LibP2pConnection, isWritable: boolean): number {
    const connId = this.nextConnId++;
    let pushable = isWritable
      ? PullPushable((error) => {
        l.debug(() => [`${this.shortId} pushable error`, error]);

        this.clearConnection(connId);
      })
      : null;

    this.connections[connId] = {
      connection,
      pushable
    };

    this._receive(connection, connId);

    if (isWritable) {
      pull(pushable, connection);

      this.send(
        new Status({
          roles: [this.config.sync === 'full' ? 'full' : 'light'],
          bestNumber: this.chain.blocks.bestNumber.get(),
          bestHash: this.chain.blocks.bestHash.get(),
          genesisHash: this.chain.genesis.block.hash,
          minSupportedVersion: defaults.MIN_PROTOCOL_VERSION,
          version: defaults.PROTOCOL_VERSION
        })
      );
    }

    return connId;
  }

  disconnect (): void {
    // Object.keys(this.connections).forEach((connId: any) =>
    //   this.clearConnection(connId)
    // );

    this.bestHash = new Uint8Array([]);
    this.connections = {};
    this.peerInfo.disconnect();

    this.emit('disconnected');
  }

  isActive (): boolean {
    return this.bestHash.length !== 0 && this.isWritable();
  }

  private pushables (): Array<Pushable> {
    // @ts-ignore yeap, we are filtering them right out at the end
    return Object
      .values(this.connections)
      .map(({ pushable }) => pushable)
      .filter((pushable) => pushable);
  }

  isWritable (): boolean {
    return this.pushables().length !== 0;
  }

  getNextId (): number {
    return ++this.nextId;
  }

  _receive (connection: LibP2pConnection, connId: number): boolean {
    let data: Uint8Array | null = null;
    let received: number;
    let remaining: number = 0;

    try {
      pull(connection, pull.drain(
        (buffer: Buffer): void => {
          // NOTE We can receive multiple messages (complete or incomplete in a single packet)
          // loop through and slice to the next as we go along
          while (buffer.length) {
            let handleSize;

            if (data === null) {
              // NOTE the actual incoming message has a varint prefixed length, strip this
              remaining = varint.decode(buffer);
              received = 0;

              const offset = varint.decode.bytes;

              handleSize = Math.min(remaining, buffer.length - offset);
              data = new Uint8Array(remaining);
              buffer = buffer.slice(offset);
            } else {
              handleSize = Math.min(remaining, buffer.length);
            }

            data.set(bufferToU8a(buffer.slice(0, handleSize)), received);

            received += handleSize;
            remaining -= handleSize;

            buffer = buffer.slice(handleSize);

            if (remaining === 0) {
              const message = decodeMessage(data);

              // l.debug(() => [this.shortId, 'decoded', { message }]);

              this.emit('message', message);

              if (message.type === 0) {
                this.emit('active');
              }

              data = null;
            }
          }
        },
        (error) => {
          l.debug(() => [`${this.shortId} receive error`, error]);

          this.clearConnection(connId);

          return false;
        }
      ));
    } catch (error) {
      l.debug(() => [`${this.shortId} receive error`, error]);

      this.clearConnection(connId);

      return false;
    }

    return true;
  }

  send (message: MessageInterface): boolean {
    try {
      const encoded = message.encode();
      const length = varint.encode(encoded.length);
      const buffer = u8aToBuffer(
        u8aConcat(
          bufferToU8a(length),
          encoded
        )
      );

      l.debug(() => [`sending ${this.shortId} -> ${u8aToHex(encoded)}`]);

      this.pushables().forEach((pushable) =>
        pushable.push(buffer)
      );
    } catch (error) {
      l.error(`${this.shortId} send error`, error);
      return false;
    }

    return true;
  }

  setBest (bestNumber: BN, bestHash: Uint8Array): void {
    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
  }
}
