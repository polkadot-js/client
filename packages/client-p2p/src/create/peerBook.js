// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const assert = require('@polkadot/util/assert');
const PeerBook = require('peer-book');

const createPeerInfo = require('./peerInfo');

module.exports = async function createPeerBook (peers: ChainConfigType$Nodes = []): Promise<PeerBook> {
  assert(Array.isArray(peers), 'Expected an array of addresses');

  const peerBook = new PeerBook();
  const peerInfos = await Promise.all(
    peers.map((peer) => createPeerInfo([peer]))
  );

  peerInfos.forEach((peerInfo) => {
    peerBook.put(peerInfo);
  });

  return peerBook;
};
