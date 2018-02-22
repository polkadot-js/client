// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');

const index = require('./index');

describe('set_storage', () => {
  let heap;
  let storage;
  let set_storage;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x53, 0x61, 0x79, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len)
    };

    storage = {
      set: jest.fn()
    };

    set_storage = index({ l, heap, storage }).set_storage;
  });

  it('sets the value into storage', () => {
    set_storage(0, 3, 3, 5);

    expect(
      storage.set
    ).toHaveBeenCalledWith(
      new Uint8Array([0x53, 0x61, 0x79]),
      new Uint8Array([72, 101, 108, 108, 111])
    );
  });
});
