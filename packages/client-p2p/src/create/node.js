// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { P2pConfigType } from '../types';

const Libp2p = require('libp2p');

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode (config: P2pConfigType, chain: ChainConfigType): Promise<Libp2p> {
  assert(isObject(config), 'Expected P2P configuration');
  assert(isObject(chain), 'Expected chain definition');

  const listener = await createListener(config.address, config.port);
  const peerBook = await createPeerBook(config.peers);
  const nodeConfig = createConfig(listener, chain.nodes);

  return new Libp2p(nodeConfig, listener, peerBook);
};
