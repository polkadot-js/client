// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType, ChainConfigType$Nodes } from '@polkadot/client-chains/types';
import type { P2pConfigType } from '../types';

const assert = require('@polkadot/util/assert');
const Libp2p = require('libp2p');

const createConfig = require('./config');
const createPeer = require('./peer');

module.exports = async function createNode (config: P2pConfigType, chain: ChainConfigType, peers: ChainConfigType$Nodes = []): Promise<Libp2p> {
  assert(config, 'Expected a valid p2p config object');

  assert(chain, 'Expected a valid chain defintion');

  const peerInfo = await createPeer(config.address, config.port);
  const nodeConfig = createConfig(peerInfo, chain.nodes);

  return new Libp2p(nodeConfig, peerInfo);
};
