// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import PeerInfo from 'peer-info';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { PeerInterface } from '../types';

import BN from 'bn.js';
import EventEmitter from 'eventemitter3';
import PullPushable, { Pushable } from 'pull-pushable';
import pull from 'pull-stream';
import varint from 'varint';
import decodeMessage from '@polkadot/client-p2p-messages/index';
import Status from '@polkadot/client-p2p-messages/Status';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import logger from '@polkadot/util/logger';
import stringShorten from '@polkadot/util/string/shorten';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToHex from '@polkadot/util/u8a/toHex';

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
  readonly peerInfo: PeerInfo;
  readonly shortId: string;

  constructor (config: Config, chain: ChainInterface, peerInfo: PeerInfo) {
    super();

    this.chain = chain;
    this.config = config;
    this.connections = {};
    this.id = peerInfo.id.toB58String();
    this.peerInfo = peerInfo;
    this.shortId = stringShorten(this.id);
  }

  private clearConnection (connId: number): void {
    delete this.connections[connId];

    l.debug(() => ['clearConnection', connId, this.shortId, this.isWritable()]);

    if (!this.isWritable()) {
      this.emit('disconnected');
    }
  }

  addConnection (connection: LibP2pConnection, isWritable: boolean): void {
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
          roles: this.config.roles,
          bestNumber: this.chain.blocks.bestNumber.get(),
          bestHash: this.chain.blocks.bestHash.get(),
          genesisHash: this.chain.genesis.headerHash,
          version: defaults.PROTOCOL_VERSION
        })
      );
    }
  }

  isActive (): boolean {
    return this.bestHash.length !== 0 && this.isWritable();
  }

  private pushables (): Array<Pushable> {
    // @ts-ignore yeap, we are filtering them right out at the end
    return Object
      .values(this.connections)
      .map(({ pushable }) =>
        pushable
      )
      .filter((pushable) =>
        pushable
      );
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
    let length: number = 0;

    try {
      pull(connection, pull.drain(
        (buffer: Buffer): void => {
          if (data === null) {
            // NOTE the actual incoming message has a varint prefixed length, strip this
            length = varint.decode(buffer);

            const offset = varint.decode.bytes;

            received = buffer.length - offset;
            data = new Uint8Array(length);
            data.set(bufferToU8a(buffer).subarray(offset), 0);
          } else {
            const u8a = bufferToU8a(buffer);

            data.set(u8a, received);
            received += u8a.length;
          }

          if (received === length) {
            const message = decodeMessage(data.subarray(1));

            l.debug(() => [this.shortId, 'received', { message }]);

            this.emit('message', message);

            if (message.type === 0) {
              this.emit('active');
            }

            data = null;
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
      const length = varint.encode(encoded.length + 1);
      const buffer = u8aToBuffer(
        u8aConcat(
          bufferToU8a(length),
          new Uint8Array([0]),
          encoded
        )
      );

      l.debug(() => [`sending ${this.shortId} -> ${u8aToHex(encoded)}`, message]);

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
