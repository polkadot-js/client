// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../server/types';
import type { PeerInterface } from '../types';
import type { SyncState$Request } from './types';

module.exports = function peerRequests ({ sync: { blockRequests } }: P2pState, peer: PeerInterface): Array<SyncState$Request> {
  return blockRequests.filter(({ peerId }) => peer.id === peerId);
};
