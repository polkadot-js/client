// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType, ChainConfigType$Nodes } from '@polkadot/client-chains/types';
import type { P2pConfigType } from '../types';

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');
const Libp2p = require('libp2p');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode (config: P2pConfigType, chain: ChainConfigType, peers: ChainConfigType$Nodes = []): Promise<Libp2p> {
  assert(isObject(config), 'Expected a valid p2p config object');

  assert(isObject(chain), 'Expected a valid chain defintion');

  const listener = await createListener(config.address, config.port);
  const peerBook = await createPeerBook(peers);
  const nodeConfig = createConfig(listener, chain.nodes);

  return new Libp2p(nodeConfig, listener, peerBook);
};
