// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
// flowlint unsafe-getters-setters:off

import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { Pushable } from 'pull-pushable';
import type { MessageInterface, PeerInterface } from './types';
import type StatusMessage from './message/status';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');
const pushable = require('pull-pushable');

const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const stringShorten = require('@polkadot/util/string/shorten');

const rlpDecode = require('./rlp/decode');
const rlpEncode = require('./rlp/encode');

module.exports = class Peer extends EventEmitter implements PeerInterface {
  _connections: Array<LibP2P$Connection> = [];
  _id: string;
  _peerInfo: PeerInfo;
  _pushable: Pushable;
  _shortId: string;
  status: ?StatusMessage = null;

  constructor (peerInfo: PeerInfo) {
    super();

    this._id = peerInfo.id.toB58String();
    this._shortId = stringShorten(this.id);
    this._peerInfo = peerInfo;
    this._pushable = pushable();
  }

  get id (): string {
    return this._id;
  }

  get shortId (): string {
    return this._shortId;
  }

  get peerInfo (): PeerInfo {
    return this._peerInfo;
  }

  get isConnected (): boolean {
    return !!this._connections.length;
  }

  get hasStatus (): boolean {
    return !!this.status;
  }

  addConnection (connection: LibP2P$Connection): boolean {
    this._connections.push(connection);

    return this._receive(connection);
  }

  _decodeMessage = (encoded: Uint8Array): void => {
    console.log('R', encoded);

    const message = rlpDecode(encoded);

    this.emit('message', message);
  }

  _encodeMessage = (message: MessageInterface): Uint8Array => {
    const encoded = rlpEncode(message);

    console.log('W', encoded);

    return encoded;
  }

  _receive (connection: LibP2P$Connection): boolean {
    try {
      pull(
        this._pushable,
        connection
      );

      pull(
        connection,
        pull.drain(
          (buffer: Buffer) =>
            this._decodeMessage(
              bufferToU8a(buffer)
            ),
          () => false
        )
      );
    } catch (error) {
      return false;
    }

    return true;
  }

  send (message: MessageInterface): boolean {
    try {
      this._pushable.push(
        u8aToBuffer(
          this._encodeMessage(message)
        )
      );
    } catch (error) {
      return false;
    }

    return true;
  }
};
