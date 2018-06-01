// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pNodes } from '../types';

const Libp2p = require('libp2p');

const createConfig = require('./config');
const createListener = require('./listener');
const createPeerBook = require('./peerBook');

module.exports = async function createNode (address: string, port: number, peers: P2pNodes = []): Promise<Libp2p> {
  const listener = await createListener(address, port);
  const peerBook = await createPeerBook(peers);
  const nodeConfig = createConfig(listener, []);

  return new Libp2p(nodeConfig, listener, peerBook);
};
