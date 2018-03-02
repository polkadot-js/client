// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type PeerInfo from 'peer-info';
import type { MessageInterface, PeerInterface } from '../types';
import type StatusMessage from '../message/status';
import type { PeerState } from './types';

const EventEmitter = require('eventemitter3');
const pushable = require('pull-pushable');

const stringShorten = require('@polkadot/util/string/shorten');

const addConnection = require('./addConnection');
const send = require('./send');

module.exports = function createPeer (peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  const shortId = stringShorten(id);
  const self: PeerState = {
    connections: [],
    emitter: new EventEmitter(),
    pushable: pushable(),
    status: null
  };

  return {
    id,
    peerInfo,
    shortId,
    status: null,
    addConnection: (connection: LibP2P$Connection): boolean =>
      addConnection(self, connection),
    isConnected: (): boolean =>
      !!self.connections.length,
    hasStatus: (): boolean =>
      !!self.status,
    on: self.emitter.on,
    send: (message: MessageInterface): boolean =>
      send(self, message),
    setStatus: (message: MessageInterface): void => {
      // flowlint-next-line unclear-type:off
      self.status = ((message: any): StatusMessage);
    }
  };
};
