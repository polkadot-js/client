// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, PeerInterface } from '../types';
import { SyncState$Request } from './types';

type Requests = Array<SyncState$Request>;

export default function peerRequests ({ sync: { blockRequests } }: P2pState, peer: PeerInterface): Requests {
  const requests: Requests = (Object.values(blockRequests): any);

  return requests.filter(({ peer: { id } }) => peer.id === id);
}
