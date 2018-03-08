// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockRequestMessage } from '../message/types';
import type { P2pState } from '../server/types';
import type { PeerInterface } from '../types';

const BN = require('bn.js');
const isU8a = require('@polkadot/util/is/u8a');

const blockResponse = require('../message/blockResponse');
const { MAX_SYNC_BLOCKS } = require('../defaults');
const getBlockData = require('./getBlockData');

module.exports = function provideBlocks (self: P2pState, peer: PeerInterface, request: BlockRequestMessage): void {
  // flowlint-next-line unclear-type:off
  const current = ((request.from: any): BN);
  const best = self.chain.blocks.getBestNumber();
  const blocks = [];

  // FIXME: Also send blocks starting with hash
  let count = isU8a(request.from) ? MAX_SYNC_BLOCKS : 0;
  const increment = request.direction === 'ascending' ? new BN(1) : new BN(-1);

  while (count < MAX_SYNC_BLOCKS && current.lte(best) && !current.isNeg()) {
    const hash = self.chain.state.getBlockHash(current);

    blocks.push(
      getBlockData(self, request.fields, hash)
    );

    count++;
    current.iadd(increment);
  }

  peer.send(
    blockResponse({
      blocks,
      id: request.id
    })
  );
};
