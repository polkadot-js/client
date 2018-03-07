// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PeerInterface } from '../types';
import type { P2pState } from './types';

const statusMessage = require('../message/status');

module.exports = function onPeerConnected (self: P2pState): void {
  self.peers.on('connected', (peer: PeerInterface): boolean => {
    return peer.send(
      statusMessage({
        roles: self.config.roles,
        bestNumber: self.chain.blocks.getBestNumber(),
        bestHash: self.chain.blocks.getBestHash(),
        genesisHash: self.chain.genesis.hash
      })
    );
  });
};
