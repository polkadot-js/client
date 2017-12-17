// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ChainConfigType, ChainConfigType$Nodes } from '@polkadot/client-chains/types';

const Libp2p = require('libp2p');

const assert = require('@polkadot/util/assert');
const isIp = require('@polkadot/util/is/ip');
const isNumber = require('@polkadot/util/is/number');
const isObject = require('@polkadot/util/is/object');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode (address: string, port: number, chain: ChainConfigType, peers: ChainConfigType$Nodes = []): Promise<Libp2p> {
  assert(isIp(address), 'Expected IP address');
  assert(isNumber(port), 'Expected numeric port');
  assert(isObject(chain), 'Expected chain definition');
  assert(Array.isArray(peers), 'Expected peers Array');

  const listener = await createListener(address, port);
  const peerBook = await createPeerBook(peers);
  const nodeConfig = createConfig(listener, chain.nodes);

  return new Libp2p(nodeConfig, listener, peerBook);
};
