// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const envDb = require('../environment/db');
const envHeap = require('../environment/heap');
const index = require('./index');

describe('get_allocated_storage', () => {
  let get_allocated_storage;
  let heap;
  let db;

  beforeEach(() => {
    heap = envHeap();
    heap.setWasmMemory({ buffer: new Uint8Array(1024 * 1024) });
    db = envDb({});

    get_allocated_storage = index({ l, heap, db }).get_allocated_storage;
  });

  it('retrieves allocated storage for a key', () => {
    const key = u8aFromString('key');
    const value = u8aFromString('some value');

    db.set(key, value);

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
});
