// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');

const index = require('./index');

describe('twox_128', () => {
  let heap;
  let twox_128;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x01, 0x61, 0x62, 0x63, 0x64, 0x01]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len),
      set: jest.fn()
    };

    twox_128 = index({ l, heap }).twox_128;
  });

  it('stores the retrieved value', () => {
    twox_128(1, 3, 16);

    expect(
      heap.set
    ).toHaveBeenCalledWith(
      16,
      new Uint8Array([153, 9, 119, 173, 245, 44, 188, 68, 8, 137, 50, 153, 129, 202, 169, 190])
    );
  });
});
