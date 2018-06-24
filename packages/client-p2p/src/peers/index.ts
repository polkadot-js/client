// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { PeerInterface, PeersInterface, PeersInterface$Events, P2pState } from '../types';
import PeerInfo from 'peer-info';

import add from './add';
import emitterOn from './emitterOn';
import logPeer from './logPeer';
import get from './get';
import onConnect from './onConnect';
import onDisconnect from './onDisconnect';
import onDiscovery from './onDiscovery';
import createState from './state';

export default function createPeers (state: P2pState): PeersInterface {
  const self = createState(state);

  onConnect(self, state.node);
  onDisconnect(self, state.node);
  onDiscovery(self, state.node);

  return {
    add: (peerInfo: PeerInfo): PeerInterface =>
      add(self, peerInfo),
    count: (): number =>
      Object.keys(self.peers).length,
    log: (event: PeersInterface$Events, peer: PeerInterface): void =>
      logPeer(self, event, peer),
    get: (peerInfo: PeerInfo): PeerInterface | undefined =>
      get(self, peerInfo),
    on: emitterOn(self),
    peers: (): Array<PeerInterface> =>
      Object.keys(self.peers).map((id) =>
        self.peers[id]
      )
  };
}
