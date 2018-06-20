// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type LibP2P from 'libp2p';
import type PeerInfo from 'peer-info';
import type { PeersState } from './types';

import get from './get';
import logPeer from './logPeer';

export default function onDisconnect (self: PeersState, node: LibP2P): void {
  node.on('peer:disconnect', (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    const peer = get(self, peerInfo);

    if (!peer) {
      return false;
    }

    delete self.peers[peer.id];

    logPeer(self, 'disconnected', peer);

    return true;
  });
}
