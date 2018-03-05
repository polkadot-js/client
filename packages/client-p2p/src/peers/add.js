// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type PeerInfo from 'peer-info';
import type { MessageInterface, PeerInterface } from '../types';
import type { PeersState } from './types';

const createPeer = require('../peer');

module.exports = function add (self: PeersState, peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  let peer = self.peers[id];

  if (!peer) {
    self.peers[id] = peer = createPeer(peerInfo);

    peer.on('message', (message: MessageInterface) => {
      self.emitter.emit('message', {
        message,
        peer
      });
    });
  }

  return peer;
};
