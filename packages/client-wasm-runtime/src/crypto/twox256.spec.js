// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const index = require('./index');

describe('twox_256', () => {
  let heap;
  let twox_256;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x01, 0x61, 0x62, 0x63, 0x64, 0x01]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len),
      set: jest.fn()
    };

    twox_256 = index({ heap }).twox_256;
  });

  it('stores the retrieved value', () => {
    twox_256(1, 3, 16);

    expect(
      heap.set
    ).toHaveBeenCalledWith(
      16,
      new Uint8Array([
        0x44, 0xbc, 0x2c, 0xf5, 0xad, 0x77, 0x09, 0x99,
        0xbe, 0xa9, 0xca, 0x81, 0x99, 0x32, 0x89, 0x08,
        0x53, 0xa0, 0xb8, 0xb2, 0x70, 0x57, 0xda, 0xf7,
        0x2b, 0xd6, 0x0d, 0x36, 0x95, 0x5d, 0xb7, 0x03
      ])
    );
  });
});
