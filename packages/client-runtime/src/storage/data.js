// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage$Data, PointerType } from '../types';

const get = require('./get');

module.exports = function data ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage$Data {
  return {
    clear_storage: (keyPtr: PointerType, keyLength: number): void => {
      const key = heap.get(keyPtr, keyLength);

      l.debug(() => ['clear_storage', [keyPtr, keyLength], '<-', key.toString()]);

      db.del(key);
    },
    get_allocated_storage: (keyPtr: PointerType, keyLength: number, lenPtr: PointerType): PointerType => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key);

      l.debug(() => ['get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', key.toString()]);

      heap.setU32(lenPtr, data.length);

      return heap.set(heap.allocate(data.length), data);
    },
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      const key = heap.get(keyPtr, keyLength);
      const data = get(db, key, dataLength);

      l.debug(() => ['get_storage_into', [keyPtr, keyLength, dataPtr, dataLength], '<-', key.toString(), '->', data.toString()]);

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void => {
      const key = heap.get(keyPtr, keyLength);
      const data = heap.get(dataPtr, dataLength);

      l.debug(() => ['set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', key.toString(), '=', data.toString()]);

      db.set(key, data);
    }
  };
};
