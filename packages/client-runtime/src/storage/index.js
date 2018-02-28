// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage, PointerType } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');

const clear = require('./clear');
const enumerated = require('./enumerated');
const get = require('./get');

module.exports = function storage (env: RuntimeEnv): RuntimeInterface$Storage {
  const { l, heap, db } = env;

  return {
    clear_storage: (keyPtr: PointerType, keyLength: number): void =>
      clear(env, heap.get(keyPtr, keyLength)),
    enumerated_trie_root: (valuesPtr: PointerType, lenPtr: PointerType, count: number, resultPtr: PointerType): void => {
      heap.set(resultPtr, enumerated(env, valuesPtr, lenPtr, count));
    },
    storage_root: (resultPtr: PointerType): void => {
      // l.debug('storage_root', [resultPtr]);

      heap.set(resultPtr, trieRoot(db.pairs()));
    },
    get_allocated_storage: (keyPtr: PointerType, keyLength: number, lenPtr: PointerType): PointerType => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key);

      // l.debug('get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', key.toString());

      heap.setU32(lenPtr, data.length);

      return heap.set(
        heap.allocate(data.length),
        data
      );
    },
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key, dataLength);

      l.debug('get_storage_into', [keyPtr, keyLength, dataPtr, dataLength], '<-', key.toString(), '->', data.toString());

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void => {
      const key = heap.get(keyPtr, keyLength);
      const data = heap.get(dataPtr, dataLength);

      l.debug('set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', key.toString(), data.toString());

      db.set(key, data);
    }
  };
};
