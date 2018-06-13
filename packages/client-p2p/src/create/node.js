// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../types';

const Libp2p = require('libp2p');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode ({ config: { p2p: { address, port, nodes = [] } }, l }: P2pState): Promise<Libp2p> {
  const peerBook = await createPeerBook([]);
  const listener = await createListener(address, port);
  const nodeConfig = createConfig(listener, nodes);
  const addrs = listener.multiaddrs.toArray().map((addr) => addr.toString());

  l.log(`creating Libp2p with ${addrs.join(', ')}`);

  return new Libp2p(nodeConfig, listener, peerBook);
};
