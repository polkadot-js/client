// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

const createNode = require('./create/node');
const createPeers = require('./peers');
const defaults = require('./defaults');
const onPeerConnected = require('./onPeerConnected');
const onPeerDiscovery = require('./onPeerDiscovery');
const onPeerMessage = require('./handler');
const onProtocol = require('./onProtocol');
const stop = require('./stop');

module.exports = async function start (self: P2pState): Promise<boolean> {
  stop(self);

  self.node = await createNode(self.config.p2p.address, self.config.p2p.port, self.config.p2p.peers);
  self.node.handle(defaults.PROTOCOL, onProtocol(self));
  self.peers = createPeers(self.node);

  onPeerConnected(self);
  onPeerDiscovery(self);
  onPeerMessage(self);

  await promisify(self.node, self.node.start);

  self.l.log(`Started on address=${self.config.p2p.address}, port=${self.config.p2p.port}`);
  self.emitter.emit('started');

  return true;
};
