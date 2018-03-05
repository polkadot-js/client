// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeerInterface, PeersInterface } from '../types';
import type { PeersState } from './types';
import type LibP2P from 'libp2p';
import type PeerInfo from 'peer-info';

const EventEmitter = require('eventemitter3');

const l = require('@polkadot/util/logger')('p2p/peers');

const add = require('./add');
const emitterOn = require('./emitterOn');
const get = require('./get');
const onConnect = require('./onConnect');
const onDisconnect = require('./onDisconnect');
const onDiscovery = require('./onDiscovery');

module.exports = function createPeers (node: LibP2P): PeersInterface {
  const self: PeersState = {
    emitter: new EventEmitter(),
    l,
    peers: {}
  };

  onConnect(self, node);
  onDisconnect(self, node);
  onDiscovery(self, node);

  return {
    add: (peerInfo: PeerInfo): PeerInterface =>
      add(self, peerInfo),
    count: (): number =>
      Object.keys(self.peers).length,
    get: (peerInfo: PeerInfo): ?PeerInterface =>
      get(self, peerInfo),
    on: emitterOn(self),
    peers: (): Array<PeerInterface> =>
      // flowlint-next-line unclear-type:off
      ((Object.values(self.peers): any): Array<PeerInterface>)
  };
};
