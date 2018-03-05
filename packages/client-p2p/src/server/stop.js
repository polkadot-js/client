// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from './types';

const promisify = require('@polkadot/util/promisify');

module.exports = async function stop (self: P2pState): Promise<boolean> {
  if (!self.node) {
    return false;
  }

  const node = self.node;

  // $FlowFixMe
  self.node = null;

  // $FlowFixMe
  self.peers = null;

  await promisify(node, node.stop);

  self.l.log('Server stopped');
  self.emitter.emit('stopped');

  return true;
};
