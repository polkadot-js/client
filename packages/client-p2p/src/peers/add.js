// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type PeerInfo from 'peer-info';
import type { MessageInterface, PeerInterface } from '../types';
import type { PeersState } from './types';

const createPeer = require('../peer');

module.exports = function add ({ chain, config, emitter, peers }: PeersState, peerInfo: PeerInfo): PeerInterface {
  const id = peerInfo.id.toB58String();
  let peer = peers[id];

  if (!peer) {
    peers[id] = peer = createPeer(config, chain, peerInfo);

    peer.on('message', (message: MessageInterface): void => {
      emitter.emit('message', {
        message,
        peer
      });
    });
  }

  return peer;
};
