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
    clear_storage: (keyPtr: PointerType, keyLength: number): void => {
      const key = heap.get(keyPtr, keyLength);

      l.debug('clear_storage', [keyPtr, keyLength], key);

      db.del(key);
    },
    enumerated_trie_root: (valuesPtr: PointerType, lenPtr: PointerType, count: number, resultPtr: PointerType): void => {
      // l.debug('enumerated_trie_root', [valuesPtr, lenPtr, count, resultPtr]);

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
      // l.debug('storage_root', [resultPtr]);

      heap.set(resultPtr, trieRoot(db.pairs()));
    },
    get_allocated_storage: (keyPtr: PointerType, keyLength: number, lenPtr: PointerType): PointerType => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key);

      // l.debug('get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', key);

      heap.setU32(lenPtr, data.length);

      return heap.set(
        heap.allocate(data.length),
        data
      );
    },
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key, dataLength);

      l.debug('get_storage_into', [keyPtr, keyLength, dataPtr, dataLength], '<-', key, '->', data);

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void => {
      const key = heap.get(keyPtr, keyLength);
      const data = heap.get(dataPtr, dataLength);

      l.debug('set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', key, data);

      db.set(key, data);
    }
  };
};
