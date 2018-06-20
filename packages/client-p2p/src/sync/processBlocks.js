// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pState } from '../types';

import u8aConcat from '@polkadot/util/u8a/concat';

export default function processBlocks ({ l, chain, sync }: P2pState): void {
  const start = Date.now();
  const startNumber = chain.blocks.bestNumber.get().addn(1);
  let nextNumber = startNumber;
  let count = 0;

  while (sync.blockQueue[nextNumber]) {
    const { header, body } = sync.blockQueue[nextNumber];
    const block = u8aConcat(
      // flowlint-next-line unclear-type:off
      (header: any), (body: any)
    );

    if (!chain.executor.importBlock(block)) {
      break;
    }

    delete sync.blockQueue[nextNumber];

    count++;
    nextNumber = nextNumber.addn(1);
  }

  if (count) {
    l.log(`#${startNumber.toString()}- ${count} imported (${Date.now() - start}ms)`);
  }
}
