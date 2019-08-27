/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { logger } from '@polkadot/util';

import index from '.';

const l = logger('test');

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
