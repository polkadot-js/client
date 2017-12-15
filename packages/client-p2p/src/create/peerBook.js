// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const PeerBook = require('peer-book');

const assert = require('@polkadot/util/assert');

const createPeerInfo = require('./peerInfo');

module.exports = async function createPeerBook (peers: ChainConfigType$Nodes = []): Promise<PeerBook> {
  assert(Array.isArray(peers), 'Expected an array of peer addresses');

  const peerBook = new PeerBook();
  const peerInfos = await Promise.all(
    peers.map((peer) => createPeerInfo([peer]))
  );

  peerInfos.forEach((peerInfo) => {
    peerBook.put(peerInfo);
  });

  return peerBook;
};
