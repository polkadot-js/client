// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const PeerBook = require('peer-book');

const createPeerInfo = require('./peerInfo');

module.exports = async function createPeerBook (peers: ChainConfigType$Nodes = []): Promise<PeerBook> {
  const peerBook = new PeerBook();
  const peerInfos = await Promise.all(
    peers.map((peer) => createPeerInfo([peer]))
  );

  peerInfos.forEach((peerInfo) => {
    peerBook.put(peerInfo);
  });

  return peerBook;
};
