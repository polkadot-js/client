// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

const createNode = require('./create/node');
const createPeers = require('./peers');
const handleProtocol = require('./handleProtocol');
const onPeerDiscovery = require('./onPeerDiscovery');
const onPeerMessage = require('./handler');
const stop = require('./stop');

module.exports = async function start (self: P2pState): Promise<boolean> {
  stop(self);

  self.node = await createNode(self);
  self.peers = createPeers(self);

  handleProtocol(self);
  onPeerDiscovery(self);
  onPeerMessage(self);

  await promisify(self.node, self.node.start);

  self.l.log(`Started on address=${self.config.p2p.address}, port=${self.config.p2p.port}`);
  self.emitter.emit('started');

  return true;
};
