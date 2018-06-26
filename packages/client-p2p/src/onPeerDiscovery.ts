// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState, PeerInterface } from './types';

import dialPeers from './dialPeers';

export default function onPeerDiscovery (self: P2pState): void {
  self.node.on('start', () =>
    dialPeers(self)
  );

  self.peers.on('discovered', (peer: PeerInterface): void => {
    dialPeers(self, peer);
  });
}
