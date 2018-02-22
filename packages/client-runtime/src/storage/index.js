// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage, PointerType } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');
const trieRootOrdered = require('@polkadot/util-triehash/rootOrdered');

const get = require('./get');

module.exports = function storage ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage {
  return {
    enumerated_trie_root: (valuesPtr: PointerType, lenPtr: PointerType, count: number, resultPtr: PointerType): void => {
      l.debug('enumerated_trie_root', [valuesPtr, lenPtr, count, resultPtr]);

      let offset = 0;

      heap.set(resultPtr, trieRootOrdered(
        // $FlowFixMe yes, the range approach here works
        Array.apply(null, { length: count }).map((_, index) => {
          const length = heap.getU32(lenPtr + (index * 4));
          const data = heap.get(valuesPtr + offset, length);

          offset += length;

          return data;
        })
      ));
    },
    storage_root: (resultPtr: PointerType): void => {
      l.debug('storage_root', [resultPtr]);

      heap.set(resultPtr, trieRoot(db.pairs()));
    },
    get_allocated_storage: (keyPtr: PointerType, keyLength: number, lenPtr: PointerType): PointerType => {
      l.debug('get_allocated_storage', [keyPtr, keyLength, lenPtr]);

      const data = get(
        db,
        heap.get(keyPtr, keyLength)
      );

      heap.setU32(lenPtr, data.length);

      return heap.set(
        heap.allocate(data.length),
        data
      );
    },
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      l.debug('get_storage_into', [keyPtr, keyLength, dataPtr, dataLength]);

      const data = get(
        db,
        heap.get(keyPtr, keyLength),
        dataLength
      );

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void => {
      l.debug('set_storage', [keyPtr, keyLength, dataPtr, dataLength]);

      db.set(
        heap.get(keyPtr, keyLength),
        heap.get(dataPtr, dataLength)
      );
    }
  };
};
