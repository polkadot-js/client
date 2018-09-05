// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterface$Storage$Data, Pointer } from '../types';

import u8aToHex from '@polkadot/util/u8a/toHex';

import instrument from '../instrument';
import get from './get';

const U32_MAX = (2 ** 32) - 1;

export default function data ({ l, heap, db }: RuntimeEnv): RuntimeInterface$Storage$Data {
  return {
    clear_prefix: (prefixPtr: Pointer, prefixLength: number): void =>
      instrument('clear_prefix', (): void => {
        const key = heap.get(prefixPtr, prefixLength);

        l.warn('clear_prefix has not been implemented, only stubbed');
        l.debug(() => ['clear_prefix', [prefixPtr, prefixLength], '<-', u8aToHex(key)]);
      }),
    clear_storage: (keyPtr: Pointer, keyLength: number): void =>
      instrument('clear_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);

        l.debug(() => ['clear_storage', [keyPtr, keyLength], '<-', u8aToHex(key)]);

        db.del(key);
      }),
    exists_storage: (keyPtr: Pointer, keyLength: number): number =>
      instrument('exists_storage', (): number => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(db, key, 0, U32_MAX);
        const hasEntry = (data && data.length) ? 1 : 0;

        l.debug(() => ['exists_storage', [keyPtr, keyLength], '<-', u8aToHex(key), '->', hasEntry]);

        return hasEntry;
      }),
    get_allocated_storage: (keyPtr: Pointer, keyLength: number, lenPtr: Pointer): Pointer =>
      instrument('get_allocated_storage', (): Pointer => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(db, key, 0, U32_MAX);
        const length = data
          ? data.length
          : U32_MAX;

        l.debug(() => ['get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', u8aToHex(key), '->', length]);

        heap.setU32(lenPtr, length);

        if (!data) {
          return 0;
        }

        return heap.set(heap.allocate(length), data);
      }),
    get_storage_into: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number, offset: number): number =>
      instrument('get_storage_into', (): number => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(db, key, offset, dataLength);

        l.debug(() => ['get_storage_into', [keyPtr, keyLength, dataPtr, dataLength, offset], '<-', u8aToHex(key), '->', data === null ? null : u8aToHex(data)]);

        if (data === null) {
          return U32_MAX;
        }

        heap.set(dataPtr, data);

        return data.length;
      }),
    set_storage: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number): void =>
      instrument('set_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);
        const data = heap.get(dataPtr, dataLength);

        l.debug(() => ['set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', u8aToHex(key), '=', u8aToHex(data)]);

        db.put(key, data);
      })
  };
}
