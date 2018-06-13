// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type LibP2P from 'libp2p';
import type PeerInfo from 'peer-info';
import type { PeersState } from './types';

const add = require('./add');
const get = require('./get');
const logPeer = require('./logPeer');

module.exports = function onDiscovery (self: PeersState, node: LibP2P): void {
  node.on('peer:discovery', (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    let peer = get(self, peerInfo);

    if (peer) {
      return false;
    }

    peer = add(self, peerInfo);

    // NOTE Only place where we log the long id
    logPeer(self, 'discovered', peer, false);

    return true;
  });
};
