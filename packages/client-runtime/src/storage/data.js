// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage$Data, Pointer } from '../types';

const u8aToHex = require('@polkadot/util/u8a/toHex');

const instrument = require('../instrument');
const get = require('./get');

module.exports = function data ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage$Data {
  return {
    clear_storage: (keyPtr: Pointer, keyLength: number): void =>
      instrument('clear_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);

        l.debug(() => ['clear_storage', [keyPtr, keyLength], '<-', u8aToHex(key)]);

        db.del(key);
      }),
    get_allocated_storage: (keyPtr: Pointer, keyLength: number, lenPtr: Pointer): Pointer =>
      instrument('get_allocated_storage', (): Pointer => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(db, key);
        const length = data === null
          ? Number.MAX_SAFE_INTEGER
          : data.length;

        l.debug(() => ['get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', u8aToHex(key)]);

        heap.setU32(lenPtr, length);

        if (data == null) {
          return length;
        }

        return heap.set(heap.allocate(length), data);
      }),
    get_storage_into: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number): number =>
      instrument('get_storage_into', (): number => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(db, key, dataLength);

        l.debug(() => ['get_storage_into', [keyPtr, keyLength, dataPtr, dataLength], '<-', u8aToHex(key), '->', data === null ? null : u8aToHex(data)]);

        if (data === null) {
          // when nothing is there, return MAX_SAFE_INTEGER
          return Number.MAX_SAFE_INTEGER;
        }

        heap.set(dataPtr, data);

        return data.length;
      }),
    set_storage: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number): void =>
      instrument('set_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);
        const data = heap.get(dataPtr, dataLength);

        l.debug(() => ['set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', u8aToHex(key), '=', u8aToHex(data)]);

        db.set(key, data);
      })
  };
};
