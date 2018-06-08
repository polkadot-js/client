// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const Pushable = require('pull-pushable');
const pull = require('pull-stream');

const statusMessage = require('../message/status');
const receive = require('./receive');
const send = require('./send');

module.exports = function addConnection (self: PeerState, connection: LibP2P$Connection, isWritable: boolean): void {
  receive(self, connection);

  if (isWritable) {
    self.pushable = Pushable();

    pull(
      self.pushable,
      connection
    );

    send(self, statusMessage({
      roles: self.config.roles,
      bestNumber: self.chain.blocks.bestNumber.get(),
      bestHash: self.chain.blocks.bestHash.get(),
      genesisHash: self.chain.genesis.headerHash
    }));
  }
};
