// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const statusMessage = require('../message/status');
const handleConnection = require('./handleConnection');
const send = require('./send');

module.exports = function addConnection (self: PeerState, connection: LibP2P$Connection): void {
  self.connections.push(connection);

  handleConnection(self, connection);

  send(
    self, statusMessage({
      roles: self.config.roles,
      bestNumber: self.chain.blocks.bestNumber.get(),
      bestHash: self.chain.blocks.bestHash.get(),
      genesisHash: self.chain.genesis.headerHash
    })
  );
};
