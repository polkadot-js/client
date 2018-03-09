// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../types';

const u8aConcat = require('@polkadot/util/u8a/concat');

module.exports = function processBlocks ({ l, chain, sync }: P2pState): void {
  const start = Date.now();
  let nextNumber = chain.blocks.getBestNumber().addn(1);
  let nextNumberS = nextNumber.toString();
  let count = 0;

  while (sync.blockQueue[nextNumberS]) {
    const { header, body } = sync.blockQueue[nextNumberS];
    const block = u8aConcat(
      // flowlint-next-line unclear-type:off
      ((header: any): Uint8Array), ((body: any): Uint8Array)
    );

    if (!chain.executor.importBlock(block)) {
      break;
    }

    delete sync.blockQueue[nextNumberS];

    count++;
    nextNumber = nextNumber.addn(1);
    nextNumberS = nextNumber.toString();
  }

  if (count) {
    l.log(`Imported ${count} blocks (${Date.now() - start}ms)`);
  }
};
