// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const envHeap = require('./index');

describe('set', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x1, 0x2, 0x3, 0x4, 0x0, 0x0, 0x0, 0x0];

    heap = envHeap();
    heap.setWasmMemory({ buffer });
  });

  it('uses set to set a part of the buffer', () => {
    const TEST = new Uint8Array([0x6, 0x7, 0x8]);

    expect(
      heap.get(heap.set(3, TEST), 3)
    ).toEqual(TEST);
  });

  it('allows set of LE u32 values', () => {
    expect(
      heap.get(heap.setU32(4, 0x12345), 4)
    ).toEqual(
      new Uint8Array([0x45, 0x23, 0x01, 0])
    );
  });
});
