// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from './types';

import promisify from '@polkadot/util/promisify';

export default async function stop (self: P2pState): Promise<boolean> {
  if (!self.node) {
    return false;
  }

  const node = self.node;

  delete self.node;
  delete self.peers;

  await promisify(node, node.stop);

  self.l.log('Server stopped');
  self.emitter.emit('stopped');

  return true;
}
