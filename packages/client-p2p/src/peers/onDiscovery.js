// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type PeerInfo from 'peer-info';
import type { PeersState, PeerEventHandler } from './types';

const add = require('./add');
const get = require('./get');
const logPeer = require('./logPeer');

module.exports = function onDiscovery (self: PeersState): PeerEventHandler {
  return (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    let peer = get(self, peerInfo);

    if (peer) {
      return false;
    }

    peer = add(self, peerInfo);

    logPeer(self, 'discovered', peer);

    return true;
  };
};
