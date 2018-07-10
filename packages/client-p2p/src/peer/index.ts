// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import PeerInfo from 'peer-info';
import { Config } from '@polkadot/client/types';
import { ChainInterface } from '@polkadot/client-chains/types';
import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import { Logger } from '@polkadot/util/types';
import { PeerInterface } from '../types';

import BN from 'bn.js';
import E3 from 'eventemitter3';
import PullPushable, { Pushable } from 'pull-pushable';
import pull from 'pull-stream';
import varint from 'varint';
import decodeMessage from '@polkadot/client-p2p-messages/index';
import Status from '@polkadot/client-p2p-messages/Status';
import assert from '@polkadot/util/assert';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import logger from '@polkadot/util/logger';
import stringShorten from '@polkadot/util/string/shorten';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToHex from '@polkadot/util/u8a/toHex';
import u8aToUtf8 from '@polkadot/util/u8a/toUtf8';

import defaults from '../defaults';

export default class Peer extends E3.EventEmitter implements PeerInterface {
  bestHash: Uint8Array = new Uint8Array([]);
  bestNumber: BN = new BN(0);
  readonly chain: ChainInterface;
  readonly config: Config;
  readonly id: string;
  readonly l: Logger;
  private nextId: number = 0;
  readonly peerInfo: PeerInfo;
  private pushable: Pushable | null = null;
  readonly shortId: string;

  constructor (config: Config, chain: ChainInterface, peerInfo: PeerInfo) {
    super();

    this.chain = chain;
    this.config = config;
    this.id = peerInfo.id.toB58String();
    this.l = logger('p2p/peer');
    this.peerInfo = peerInfo;
    this.shortId = stringShorten(this.id);
  }

  addConnection (connection: LibP2pConnection, isWritable: boolean): void {
    this._receive(connection);

    if (isWritable) {
      this.pushable = PullPushable();

      pull(
        this.pushable,
        connection
      );

      this.send(new Status({
        roles: this.config.roles,
        bestNumber: this.chain.blocks.bestNumber.get(),
        bestHash: this.chain.blocks.bestHash.get(),
        genesisHash: this.chain.genesis.headerHash,
        version: defaults.PROTOCOL_VERSION
      }));
    }
  }

  isWritable (): boolean {
    return !!this.pushable;
  }

  getNextId (): number {
    return ++this.nextId;
  }

  _receive (connection: LibP2pConnection): boolean {
    try {
      pull(
        connection,
        pull.drain(
          (buffer: Buffer): void => {
            // NOTE the actual incoming message has a varint prefixed length, strip this
            const length = varint.decode(buffer);
            const offset = varint.decode.bytes;
            const u8a = bufferToU8a(buffer.slice(offset + 1));
            const utf8 = u8aToUtf8(u8a);

            // TODO Do we keep this peer or drop it (like Rust does on invalid messages). Additionally, do we _really_ want to throw here?
            assert(u8a.length === length - 1, 'Invalid buffer length received');

            this.l.debug(() => `received ${u8aToHex(u8a)} => ${utf8}`);

            this.emit('message', decodeMessage(utf8));
          },
          () => false
        )
      );
    } catch (error) {
      this.l.error('receive error', error);

      return false;
    }

    return true;
  }

  send (message: MessageInterface): boolean {
    if (!this.pushable) {
      return false;
    }

    try {
      const utf8 = JSON.stringify(message.encode());
      const encoded = u8aFromUtf8(utf8);
      const length = varint.encode(encoded.length + 1);

      this.l.debug(() => `sending ${u8aToHex(encoded)} <= ${utf8}`);

      this.pushable.push(
        u8aToBuffer(
          u8aConcat(
            bufferToU8a(length),
            new Uint8Array([0]),
            encoded
          )
        )
      );
    } catch (error) {
      this.l.error('send error', error);
      return false;
    }

    return true;
  }

  setBest (bestNumber: BN, bestHash: Uint8Array): void {
    this.bestHash = bestHash;
    this.bestNumber = bestNumber;
  }
}
