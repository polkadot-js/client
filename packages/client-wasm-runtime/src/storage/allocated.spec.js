// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const envHeap = require('../environment/heap');
const envStorage = require('../environment/storage');
const index = require('./index');

describe('get_allocated_storage', () => {
  let get_allocated_storage;
  let heap;
  let storage;

  beforeEach(() => {
    heap = envHeap({ buffer: new Uint8Array(64 * 1024) });
    storage = envStorage({});

    get_allocated_storage = index({ l, heap, storage }).get_allocated_storage;
  });

  it('retrieves allocated storage for a key', () => {
    const key = u8aFromString('key');
    const value = u8aFromString('some value');

    storage.set(key, value);

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
