// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockRequestMessage } from '../message/types';
import { P2pState, PeerInterface } from '../types';

import BN from 'bn.js';
import isU8a from '@polkadot/util/is/u8a';

import blockResponse from '../message/blockResponse';
import defaults from '../defaults';
import getBlockData from './getBlockData';

export default function provideBlocks (self: P2pState, peer: PeerInterface, request: BlockRequestMessage): void {
  const current = (request.from as BN);
  const best = self.chain.blocks.bestNumber.get();
  const blocks = [];

  // FIXME: Also send blocks starting with hash
  const max = Math.min(request.max || defaults.MAX_SYNC_BLOCKS, defaults.MAX_SYNC_BLOCKS);
  let count = isU8a(request.from) ? max : 0;
  const increment = request.direction === 'Ascending' ? new BN(1) : new BN(-1);

  while (count < max && current.lte(best) && !current.isNeg()) {
    const hash = self.chain.state.system.blockHashAt.get(current);

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
}
