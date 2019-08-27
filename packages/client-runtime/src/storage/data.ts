// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterfaceStorageData, Pointer } from '../types';

import { u8aToHex } from '@polkadot/util';

import instrument from '../instrument';
import get from './get';

const U32_MAX = (2 ** 32) - 1;

export default function data ({ l, heap, stateDb }: RuntimeEnv): RuntimeInterfaceStorageData {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    clear_prefix: (prefixPtr: Pointer, prefixLength: number): void =>
      instrument('clear_prefix', (): void => {
        const key = heap.get(prefixPtr, prefixLength);

        l.warn('clear_prefix has not been implemented, only stubbed');
        l.debug((): any[] => ['clear_prefix', [prefixPtr, prefixLength], '<-', u8aToHex(key)]);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    clear_storage: (keyPtr: Pointer, keyLength: number): void =>
      instrument('clear_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);

        l.debug((): any[] => ['clear_storage', [keyPtr, keyLength], '<-', u8aToHex(key)]);

        stateDb.db.del(key);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    exists_storage: (keyPtr: Pointer, keyLength: number): number =>
      instrument('exists_storage', (): number => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(stateDb, key, 0, U32_MAX);
        const hasEntry = (data && data.length) ? 1 : 0;

        l.debug((): any[] => ['exists_storage', [keyPtr, keyLength], '<-', u8aToHex(key), '->', hasEntry]);

        return hasEntry;
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    get_allocated_storage: (keyPtr: Pointer, keyLength: number, lenPtr: Pointer): Pointer =>
      instrument('get_allocated_storage', (): Pointer => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(stateDb, key, 0, U32_MAX);
        const length = data
          ? data.length
          : U32_MAX;

        l.debug((): any[] => ['get_allocated_storage', [keyPtr, keyLength, lenPtr], '<-', u8aToHex(key), '->', length]);

        heap.setU32(lenPtr, length);

        if (!data) {
          return 0;
        }

        return heap.set(heap.allocate(length), data);
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    get_storage_into: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number, offset: number): number =>
      instrument('get_storage_into', (): number => {
        const key = heap.get(keyPtr, keyLength);
        const data = get(stateDb, key, offset, dataLength);

        l.debug((): any[] => ['get_storage_into', [keyPtr, keyLength, dataPtr, dataLength, offset], '<-', u8aToHex(key), '->', data === null ? null : u8aToHex(data)]);

        if (data === null) {
          return U32_MAX;
        }

        heap.set(dataPtr, data);

        return data.length;
      }),
    // eslint-disable-next-line @typescript-eslint/camelcase
    set_storage: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number): void =>
      instrument('set_storage', (): void => {
        const key = heap.get(keyPtr, keyLength);
        const data = heap.get(dataPtr, dataLength);

        l.debug((): any[] => ['set_storage', [keyPtr, keyLength, dataPtr, dataLength], '<-', u8aToHex(key), '=', u8aToHex(data)]);

        stateDb.db.put(key, data);
      })
  };
}
