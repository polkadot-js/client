// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { P2pNodes } from '../types';

import PeerBook from 'peer-book';

import createPeerInfo from './peerInfo';

export default async function createPeerBook (peers: P2pNodes = []): Promise<PeerBook> {
  const peerBook = new PeerBook();
  const peerInfos = await Promise.all(
    peers.map((peer) =>
      createPeerInfo([peer])
    )
  );

  peerInfos.forEach((peerInfo) => {
    peerBook.put(peerInfo);
  });

  return peerBook;
}
