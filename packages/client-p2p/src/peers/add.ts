// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '@polkadot/client-p2p-messages/types';
import PeerInfo from 'peer-info';
import { PeerInterface } from '../types';
import { PeersState } from './types';

import createPeer from '../peer';

export default function add ({ chain, config, emitter, peers }: PeersState, peerInfo: PeerInfo): PeerInterface {
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
}
