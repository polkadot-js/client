// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeerInterface, PeersInterface, P2pState } from '../types';
import type PeerInfo from 'peer-info';

const add = require('./add');
const emitterOn = require('./emitterOn');
const get = require('./get');
const onConnect = require('./onConnect');
const onDisconnect = require('./onDisconnect');
const onDiscovery = require('./onDiscovery');
const createState = require('./state');

module.exports = function createPeers (state: P2pState): PeersInterface {
  const self = createState(state);

  onConnect(self, state.node);
  onDisconnect(self, state.node);
  onDiscovery(self, state.node);

  return {
    add: (peerInfo: PeerInfo): PeerInterface =>
      add(self, peerInfo),
    count: (): number =>
      Object.keys(self.peers).length,
    get: (peerInfo: PeerInfo): ?PeerInterface =>
      get(self, peerInfo),
    on: emitterOn(self),
    peers: (): Array<PeerInterface> =>
      Object.keys(self.peers).map((id) =>
        self.peers[id]
      )
  };
};
