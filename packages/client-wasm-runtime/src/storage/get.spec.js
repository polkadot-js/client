// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const index = require('./index');

describe('get_storage_into', () => {
  let heap;
  let storage;
  let get_storage_into;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x53, 0x61, 0x79, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len),
      set: jest.fn()
    };

    storage = {
      get: jest.fn((key) => new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x5]))
    };

    get_storage_into = index({ heap, storage }).get_storage_into;
  });

  it('retrieves the correct value from storage', () => {
    get_storage_into(0, 3, 3, 3);

    expect(
      storage.get
    ).toHaveBeenCalledWith('0x536179');
  });

  it('retrieves the full value when length >= available', () => {
    expect(
      get_storage_into(0, 0, 3, 10)
    ).toEqual(5);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x5]));
  });

  it('retrieves a partial value when length < available', () => {
    expect(
      get_storage_into(0, 0, 3, 3)
    ).toEqual(3);
    expect(
      heap.set
    ).toHaveBeenCalledWith(3, new Uint8Array([0x1, 0x2, 0x3]));
  });
});
