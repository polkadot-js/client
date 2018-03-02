// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { MessageInterface, PeerInterface, PeerInterface$Events } from '../types';
import type { PeerState } from './types';

const EventEmitter = require('eventemitter3');
const pushable = require('pull-pushable');

const stringShorten = require('@polkadot/util/string/shorten');

const addConnection = require('./addConnection');
const send = require('./send');
const setStatus = require('./setStatus');

module.exports = function createPeer (peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  const self: PeerState = {
    connections: [],
    emitter: new EventEmitter(),
    pushable: pushable(),
    status: null
  };

  return {
    id,
    peerInfo,
    shortId: stringShorten(id),
    status: null,
    addConnection: (connection: LibP2P$Connection): boolean =>
      addConnection(self, connection),
    isConnected: (): boolean =>
      !!self.connections.length,
    hasStatus: (): boolean =>
      !!self.status,
    // flowlint-next-line unclear-type:off
    on: (type: PeerInterface$Events, cb: (message: MessageInterface) => any): any =>
      self.emitter.on(type, cb),
    send: (message: MessageInterface): boolean =>
      send(self, message),
    setStatus: (message: MessageInterface): void =>
      setStatus(self, message)
  };
};
