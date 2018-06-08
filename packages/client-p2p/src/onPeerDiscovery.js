// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, PeerInterface } from './types';

const dialPeers = require('./dialPeers');

module.exports = function onPeerDiscovery (self: P2pState): void {
  self.node.on('start', () =>
    dialPeers(self)
  );

  self.peers.on('discovered', (peer: PeerInterface): void => {
    dialPeers(self, peer);
  });
};
