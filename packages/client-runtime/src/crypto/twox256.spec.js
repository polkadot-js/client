// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { logger } from '@polkadot/util';

import index from './index';

const l = logger('test');

describe('twox_256', () => {
  let heap;
  let twox_256;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x01, 0x61, 0x62, 0x63, 0x64, 0x01]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len),
      set: jest.fn()
    };

    twox_256 = index({ l, heap }).twox_256;
  });

  it('stores the retrieved value', () => {
    twox_256(1, 3, 16);

    expect(
      heap.set
    ).toHaveBeenCalledWith(
      16,
      new Uint8Array([153, 9, 119, 173, 245, 44, 188, 68, 8, 137, 50, 153, 129, 202, 169, 190, 247, 218, 87, 112, 178, 184, 160, 83, 3, 183, 93, 149, 54, 13, 214, 43])
    );
  });
});
