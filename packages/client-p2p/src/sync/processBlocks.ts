// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pState } from '../types';

import u8aToHex from '@polkadot/util/u8a/toHex';

export default function processBlocks ({ l, chain, sync }: P2pState): void {
  const start = Date.now();
  const startNumber = chain.blocks.bestNumber.get().addn(1);
  let nextNumber = startNumber;
  let count = 0;

  while (sync.blockQueue[nextNumber.toString()]) {
    const { hash, importable } = sync.blockQueue[nextNumber.toString()];

    l.debug(() => `Importing block #${nextNumber.toString()}, ${u8aToHex(hash)}`);

    if (!chain.executor.importBlock(importable)) {
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
