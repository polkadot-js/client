// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import MemoryDb from '@polkadot/db/Memory';
import { logger, stringToU8a } from '@polkadot/util';

import Heap from '../environment/heap';
import index from './index';

const l = logger('test');

describe('get_allocated_storage', () => {
  let get_allocated_storage;
  let heap;
  let db;

  beforeEach(() => {
    heap = new Heap();
    heap.setWasmMemory({ buffer: new Uint8Array(1024 * 1024) });

    db = new MemoryDb();

    get_allocated_storage = index({ l, heap, db }).get_allocated_storage;
  });

  it('retrieves allocated storage for a key', () => {
    const key = stringToU8a('key');
    const value = stringToU8a('some value');

    db.put(key, value);

    const keyPtr = heap.allocate(key.length);
    const lenPtr = heap.allocate(4);

    heap.set(keyPtr, key);
    heap.setU32(lenPtr, key.length);

    expect(
      heap.get(
        get_allocated_storage(keyPtr, key.length, lenPtr),
        heap.getU32(lenPtr)
      )
    ).toEqual(value);
  });

  it('returns 0, setting MAX_U32 when non-existent', () => {
    const key = stringToU8a('key');
    const keyPtr = heap.allocate(key.length);
    const lenPtr = heap.allocate(4);

    expect(
      get_allocated_storage(keyPtr, key.length, lenPtr)
    ).toEqual(0);
    expect(
      heap.getU32(lenPtr)
    ).toEqual(2 ** 32 - 1);
  });
});
