// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

import promisify from '@polkadot/util/promisify';

import createNode from './create/node';
import createPeers from './peers';
import handleProtocol from './handleProtocol';
import onPeerDiscovery from './onPeerDiscovery';
import onPeerMessage from './handler';
import stop from './stop';

export default async function start (self: P2pState): Promise<boolean> {
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
}
