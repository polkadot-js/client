// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { LibP2P$Connection } from 'libp2p';
import type { PeerState } from './types';

const receive = require('./receive');

module.exports = function addConnection (self: PeerState, connection: LibP2P$Connection): boolean {
  self.connections.push(connection);

  return receive(self, connection);
};
