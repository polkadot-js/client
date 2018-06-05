// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const onReceive = require('./onReceive');

module.exports = function addConnection (self: PeerState, connection?: LibP2P$Connection): boolean {
  // NOTE in some case (e.g. JS -> Rust), connection may be empty, bail
  if (connection === undefined) {
    return false;
  }

  self.connections.push(connection);

  return onReceive(self, connection);
};
