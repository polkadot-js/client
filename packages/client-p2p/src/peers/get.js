// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type PeerInfo from 'peer-info';
import type { PeerInterface } from '../types';
import type { PeersState } from './types';

module.exports = function get (self: PeersState, peerInfo: PeerInfo): ?PeerInterface {
  const id = peerInfo.id.toB58String();

  return self.peers[id];
};
