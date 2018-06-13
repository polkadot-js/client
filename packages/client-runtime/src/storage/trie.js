// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage$Trie, Pointer } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');
const trieRootOrdered = require('@polkadot/util-triehash/rootOrdered');

const instrument = require('../instrument');

module.exports = function storage ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage$Trie {
  return {
    enumerated_trie_root: (valuesPtr: Pointer, lenPtr: Pointer, count: number, resultPtr: Pointer): void =>
      instrument('enumerated_trie_root', (): void => {
        // $FlowFixMe yes, the range approach here works
        const pairs = Array.apply(null, { length: count }).map((_, index) => {
          const length = heap.getU32(lenPtr + (index * 4));
          const data = heap.get(valuesPtr, length);

          valuesPtr += length;

          return data;
        });

        l.debug(() => ['enumerated_trie_root', [valuesPtr, lenPtr, count, resultPtr], '<-', pairs.length]);

        heap.set(resultPtr, trieRootOrdered(pairs));
      }),
    storage_root: (resultPtr: Pointer): void =>
      instrument('storage_root', (): void => {
        const pairs = db.pairs();

        l.debug(() => ['storage_root', [resultPtr], '<-', pairs.length]);

        heap.set(resultPtr, trieRoot(pairs));
      })
  };
};
