// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../server/types';
import type { PeerInterface } from '../types';

const BN = require('bn.js');

const { MAX_SYNC_BLOCKS } = require('../defaults');
const peerRequests = require('./peerRequests');

module.exports = function peerMax (self: P2pState, peer: PeerInterface): BN {
  const first = self.chain.blocks.getBestNumber().addn(1);
  const requests = peerRequests(self, peer);

  return requests.reduce((next, { peerId, request: { raw: { from } } }) => {
    // flowlint-next-line unclear-type:off
    const last = new BN(((from: any): BN)).addn(MAX_SYNC_BLOCKS);

    return last.gt(next)
      ? last
      : next;
  }, first);
};
