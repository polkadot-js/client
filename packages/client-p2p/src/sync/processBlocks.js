// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BlockResponseMessage } from '../message/types';
import type { P2pState, PeerInterface } from '../types';

const u8aConcat = require('@polkadot/util/u8a/concat');

module.exports = function processBlocks ({ l, chain, sync }: P2pState, peer: PeerInterface, { blocks, id }: BlockResponseMessage): void {
  const start = Date.now();
  const request = sync.blockRequests[id];

  if (request.peer.id !== peer.id) {
    l.error(`Response ${id} from ${peer.shortId}, expected ${request.peer.shortId}`);
    return;
  }

  delete sync.blockRequests[id];

  const count = blocks.reduce((count, { hash, header, body }) => {
    const block = u8aConcat(
      // flowlint-next-line unclear-type:off
      ((header: any): Uint8Array), ((body: any): Uint8Array)
    );
    const hasBlock = chain.blocks.getBlock(hash).length !== 0;

    if (hasBlock || !chain.executor.importBlock(block)) {
      return count;
    }

    return count + 1;
  }, 0);

  l.log(`Imported ${count} blocks from ${peer.shortId} (${Date.now() - start}ms)`);
};
