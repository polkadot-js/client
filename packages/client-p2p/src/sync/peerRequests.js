// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState, PeerInterface } from '../types';
import type { SyncState$Request } from './types';

type Requests = Array<SyncState$Request>;

export default function peerRequests ({ sync: { blockRequests } }: P2pState, peer: PeerInterface): Requests {
  // flowlint-next-line unclear-type:off
  const requests: Requests = (Object.values(blockRequests): any);

  return requests.filter(({ peer: { id } }) => peer.id === id);
}
