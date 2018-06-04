// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, PeerInterface } from './types';

const statusMessage = require('./message/status');

module.exports = function onPeerConnected (self: P2pState): void {
  self.peers.on('connected', (peer: PeerInterface): boolean => {
    return peer.send(
      statusMessage({
        roles: self.config.roles,
        bestNumber: self.chain.blocks.bestNumber.get(),
        bestHash: self.chain.blocks.bestHash.get(),
        genesisHash: self.chain.genesis.headerHash
      })
    );
  });
};
