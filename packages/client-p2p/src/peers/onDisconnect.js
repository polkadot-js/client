// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type PeerInfo from 'peer-info';
import type { PeersState, PeerEventHandler } from './types';

const get = require('./get');
const logPeer = require('./logPeer');

module.exports = function onDisconnect (self: PeersState): PeerEventHandler {
  return (peerInfo: PeerInfo): boolean => {
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
  };
};
