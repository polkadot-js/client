// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import HashDb from '@polkadot/client-db/Hash';
import logger from '@polkadot/util/logger';
import u8aFromString from '@polkadot/util/u8a/fromString';

import envHeap from '../environment/heap';
import index from './index';

const l = logger('test');

describe('get_allocated_storage', () => {
  let get_allocated_storage;
  let heap;
  let db;

  beforeEach(() => {
    heap = envHeap();
    heap.setWasmMemory({ buffer: new Uint8Array(1024 * 1024) });

    db = new HashDb();

    get_allocated_storage = index({ l, heap, db }).get_allocated_storage;
  });

  it('retrieves allocated storage for a key', () => {
    const key = u8aFromString('key');
    const value = u8aFromString('some value');

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
    const key = u8aFromString('key');
    const keyPtr = heap.allocate(key.length);
    const lenPtr = heap.allocate(4);

    expect(
      get_allocated_storage(keyPtr, key.length, lenPtr)
    ).toEqual(0);
    expect(
      heap.getU32(lenPtr)
    ).toEqual(Math.pow(2, 32) - 1);
  });
});
