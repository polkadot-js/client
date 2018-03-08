// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../server/types';
import type { PeerInterface } from '../types';
import type { SyncState$Request } from './types';

type Requests = Array<SyncState$Request>;

module.exports = function peerRequests ({ sync: { blockRequests } }: P2pState, peer: PeerInterface): Requests {
  // flowlint-next-line unclear-type:off
  const requests = ((Object.values(blockRequests): any): Requests);

  return requests.filter(({ peer: { id } }) => peer.id === id);
};
