// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import PeerInfo from 'peer-info';
import { PeerInterface } from '../types';
import { PeersState } from './types';

export default function get (self: PeersState, peerInfo: PeerInfo): ?PeerInterface {
  const id = peerInfo.id.toB58String();

  return self.peers[id];
}
