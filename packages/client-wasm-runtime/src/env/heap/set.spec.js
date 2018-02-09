// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const envHeap = require('./index');

describe('envHeap', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x1, 0x2, 0x3, 0x4, 0x0, 0x0, 0x0, 0x0];

    heap = envHeap({ buffer });
  });

  it('uses set to set a part of the buffer', () => {
    const TEST = new Uint8Array([0x6, 0x7, 0x8]);

    heap.set(3, TEST);

    expect(
      heap.get(3, 3)
    ).toEqual(TEST);
  });

  it('allows set of LE u32 values', () => {
    heap.setU32(4, 0x12345);

    expect(
      heap.get(4, 4)
    ).toEqual(
      new Uint8Array([0x45, 0x23, 0x01, 0])
    );
  });
});
