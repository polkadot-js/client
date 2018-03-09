// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../message/types';
import type { P2pState, PeerInterface } from '../types';

const decodeHeader = require('@polkadot/primitives-codec/header/decodeRaw');

const processBlocks = require('./processBlocks');

module.exports = function queueBlocks (self: P2pState, peer: PeerInterface, { blocks, id }: BlockResponseMessage): void {
  const request = self.sync.blockRequests[peer.id];

  delete self.sync.blockRequests[peer.id];

  if (!request || request.request.id !== id) {
    self.l.error(`Mismatched response from ${peer.shortId}`);
    return;
  }

  const count = blocks.reduce((count, block) => {
    const hasImported = self.chain.blocks.getBlock(block.hash).length !== 0;
    // flowlint-next-line unclear-type:off
    const { number } = decodeHeader(((block.header: any): Uint8Array));
    const hasQueued = !!self.sync.blockQueue[number];

    if (hasImported && hasQueued) {
      return count;
    }

    self.sync.blockQueue[number] = block;

    return count + 1;
  }, 0);

  self.l.log(`Added ${count} blocks from ${peer.shortId}`);

  processBlocks(self);
};
