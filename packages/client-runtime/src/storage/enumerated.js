// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, PointerType } from '../types';

const trieRootOrdered = require('@polkadot/util-triehash/rootOrdered');

module.exports = function enumerated ({ l, heap, db }: RuntimeEnv, valuesPtr: PointerType, lenPtr: PointerType, count: number): Uint8Array {
  // l.debug('enumerated_trie_root', values.map((v) => v.toString()));

  let offset = 0;

  return trieRootOrdered(
    // $FlowFixMe yes, the range approach here works
    Array.apply(null, { length: count }).map((_, index) => {
      const length = heap.getU32(lenPtr + (index * 4));
      const data = heap.get(valuesPtr + offset, length);

      offset += length;

      return data;
    })
  );
};
