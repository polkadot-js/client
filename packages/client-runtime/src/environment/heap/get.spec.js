// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Heap from './index';

describe('get', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x1, 0x2, 0x3, 0x4, 0x0, 0x0, 0x0, 0x0];

    heap = new Heap();
    heap.setWasmMemory({ buffer });
  });

  it('uses get to return data', () => {
    expect(
      heap.get(1, 3)
    ).toEqual(
      new Uint8Array([0x2, 0x3, 0x4])
    );
  });

  it('allows retrieval of LE u32 values', () => {
    expect(
      heap.getU32(
        heap.setU32(4, 0x12345)
      )
    ).toEqual(
      0x12345
    );
  });
});
