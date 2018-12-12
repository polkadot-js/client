// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterface$Storage$Trie, Pointer } from '../types';

import { trieRootOrdered } from '@polkadot/trie-hash';
import { u8aToHex } from '@polkadot/util';

import instrument from '../instrument';

export default function storage ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage$Trie {
  return {
    blake2_256_enumerated_trie_root: (valuesPtr: Pointer, lenPtr: Pointer, count: number, resultPtr: Pointer): void =>
      instrument('enumerated_trie_root', (): void => {
        const pairs = [...Array(count).keys()].map((index: number) => {
          const length = heap.getU32(lenPtr + (index * 4));
          const data = heap.get(valuesPtr, length);

          valuesPtr += length;

          return data;
        });
        const root = trieRootOrdered(pairs);

        l.debug(() => ['enumerated_trie_root', [valuesPtr, lenPtr, count, resultPtr], '<-', pairs.length, '->', u8aToHex(root)]);

        heap.set(resultPtr, root);
      }),
    storage_root: (resultPtr: Pointer): void =>
      instrument('storage_root', (): void => {
        const root = db.getRoot();

        l.debug(() => ['storage_root', [resultPtr], '->', u8aToHex(root)]);

        heap.set(resultPtr, root);
      })
  };
}
