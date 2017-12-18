// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType, ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const Libp2p = require('libp2p');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode (address: string, port: number, { nodes = [] }: ChainConfigType, peers: ChainConfigType$Nodes = []): Promise<Libp2p> {
  const listener = await createListener(address, port);
  const peerBook = await createPeerBook(peers);
  const nodeConfig = createConfig(listener, nodes);

  return new Libp2p(nodeConfig, listener, peerBook);
};
