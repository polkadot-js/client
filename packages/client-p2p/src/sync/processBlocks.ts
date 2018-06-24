// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from '../types';

import u8aConcat from '@polkadot/util/u8a/concat';

export default function processBlocks ({ l, chain, sync }: P2pState): void {
  const start = Date.now();
  const startNumber = chain.blocks.bestNumber.get().addn(1);
  let nextNumber = startNumber;
  let count = 0;

  while (sync.blockQueue[nextNumber.toString()]) {
    const { header, body } = sync.blockQueue[nextNumber.toString()];
    const block = u8aConcat(
      (header as Uint8Array), (body as Uint8Array)
    );

    if (!chain.executor.importBlock(block)) {
      break;
    }

    delete sync.blockQueue[nextNumber.toString()];

    count++;
    nextNumber = nextNumber.addn(1);
  }

  if (count) {
    l.log(`#${startNumber.toString()}- ${count} imported (${Date.now() - start}ms)`);
  }
}
