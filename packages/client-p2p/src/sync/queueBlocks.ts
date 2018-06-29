// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockResponseMessage } from '@polkadot/client-p2p-messages/types';
import { P2pState, PeerInterface } from '../types';

import processBlocks from './processBlocks';

export default function queueBlocks (self: P2pState, peer: PeerInterface, { blocks, id }: BlockResponseMessage): void {
  const request = self.sync.blockRequests[peer.id];

  delete self.sync.blockRequests[peer.id];

  if (!request || request.request.id !== id) {
    self.l.error(`Mismatched response from ${peer.shortId}`);
    return;
  }

  const count = blocks.reduce((count: number, block) => {
    const hasImported = self.chain.blocks.block.get(block.hash).length !== 0;
    const hasQueued = !!self.sync.blockQueue[block.number.toString()];

    if (hasImported && hasQueued) {
      return count;
    }

    self.sync.blockQueue[block.number.toString()] = block;

    return count + 1;
  }, 0);

  self.l.log(`Queued ${count} blocks from ${peer.shortId}`);

  processBlocks(self);
}
