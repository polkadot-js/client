// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Heap from './index';

describe('dup', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x1, 0x2, 0x3, 0x4, 0x0, 0x0, 0x0, 0x0];

    heap = new Heap();
    heap.setWasmMemory({ buffer });
  });

  it('uses dup to return a section', () => {
    expect(
      heap.dup(0, 5)
    ).toEqual(
      new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x0])
    );
  });
});
