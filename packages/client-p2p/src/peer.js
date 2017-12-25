// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { Pushable } from 'pull-pushable';
import type { MessageInterface, PeerInterface } from './types';
import type StatusMessage from './message/status';

const EventEmitter = require('eventemitter3');
const pull = require('pull-stream');
const pushable = require('pull-pushable');

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

  // hasConnection (connection: LibP2P$Connection): boolean {
  //   const connId = connection.toString();
  //
  //   return !!this._connections.find((connection) => connection.toString() === connId);
  // }

  addConnection (connection: LibP2P$Connection): boolean {
    this._connections.push(connection);

    return this._receive(connection);
  }

  _decodeMessage = (encoded: Buffer): void => {
    console.log('R', encoded);

    const message = rlpDecode(encoded);

    this.emit('message', message);
  }

  _encodeMessage = (message: MessageInterface): Buffer => {
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
        pull.drain(this._decodeMessage, () => false)
      );
    } catch (error) {
      return false;
    }

    return true;
  }

  send (message: MessageInterface): boolean {
    try {
      this._pushable.push(
        this._encodeMessage(message)
      );
    } catch (error) {
      return false;
    }

    return true;
  }
};
