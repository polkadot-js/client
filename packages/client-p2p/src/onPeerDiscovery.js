// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, PeerInterface } from './types';

const promisify = require('@polkadot/util/promisify');

const defaults = require('./defaults');

module.exports = function onPeerDiscovery (self: P2pState): void {
  self.peers.on('discovered', async (peer: PeerInterface): Promise<void> => {
    const connection = await promisify(self.node, self.node.dial, peer.peerInfo, defaults.PROTOCOL);

    peer.addConnection(connection);
  });
};
