// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { LibP2P$Connection } from 'libp2p';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');
const pushable = require('pull-pushable');

const stringShorten = require('@polkadot/util/string/shorten');

const rlpDecode = require('./rlp/decode');
const rlpEncode = require('./rlp/encode');

module.exports = class Peer extends EventEmitter implements PeerInterface {
  _connections: Array<LibP2P$Connection> = [];
  _peerInfo: PeerInfo;

  id: string;
  shortId: string;
  status: ?StatusMessage = null;

  constructor (peerInfo: PeerInfo) {
    super();

    this.id = peerInfo.id.toB58String();
    this.shortId = stringShorten(this.id);

    this._peerInfo = peerInfo;
    this._pushable = pushable();
  }

  get isConnected (): boolean {
    return !!this._connections.length;
  }

  get hasStatus (): boolean {
    return !!this.status;
  }

  addConnection (connection: LibP2P$Connection): void {
    this._connections.push(connection);
    this._receive(connection);
  }

  _receive (connection: LibP2P$Connection): boolean {
    try {
      pull(
        this._pushable,
        connection
      );

      pull(
        connection,
        pull.drain((encoded: Buffer) => {
          console.log('R', encoded);

          this.emit('message', rlpDecode(encoded));
        })
      );
    } catch (error) {
      console.error('error', error);
      return false;
    }

    return true;
  }

  send (message: MessageInterface): boolean {
    if (!this.isConnected) {
      return false;
    }

    try {
      const encoded = rlpEncode(message);

      console.log('W', encoded);

      this._pushable.push(encoded);
    } catch (error) {
      return false;
    }

    return true;
  }
};
