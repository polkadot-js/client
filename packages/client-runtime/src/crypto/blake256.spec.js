// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');

const index = require('./index');

describe('blake2_256', () => {
  let heap;
  let blake2_256;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x01, 0x61, 0x62, 0x63, 0x64, 0x01]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len),
      set: jest.fn()
    };

    blake2_256 = index({ l, heap }).blake2_256;
  });

  it('stores the retrieved value', () => {
    blake2_256(1, 3, 16);

    expect(
      heap.set
    ).toHaveBeenCalledWith(
      16,
      new Uint8Array([189, 221, 129, 60, 99, 66, 57, 114, 49, 113, 239, 63, 238, 152, 87, 155, 148, 150, 78, 59, 177, 203, 62, 66, 114, 98, 200, 192, 104, 213, 35, 25])
    );
  });
});
