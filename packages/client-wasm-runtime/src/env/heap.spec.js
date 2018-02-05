// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const envHeap = require('./heap');

describe('envHeap', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x1, 0x2, 0x3, 0x4, 0x0, 0x0, 0x0, 0x0];

    heap = envHeap({ buffer });
  });

  it('uses dup to return a section', () => {
    expect(
      heap.dup(0, 5)
    ).toEqual(
      new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x0])
    );
  });

  it('uses get to return data', () => {
    expect(
      heap.get(1, 3)
    ).toEqual(
      new Uint8Array([0x2, 0x3, 0x4])
    );
  });

  it('uses set to set a part of the buffer', () => {
    const TEST = new Uint8Array([0x6, 0x7, 0x8]);

    heap.set(3, TEST);

    expect(
      heap.get(3, 3)
    ).toEqual(TEST);
  });

  it('allows set of LE u32 values', () => {
    heap.setLU32(4, 0x12345);

    expect(
      heap.get(4, 4)
    ).toEqual(
      new Uint8Array([0x45, 0x23, 0x01, 0])
    );
  });

  it('allows retrieval of LE u32 values', () => {
    heap.setLU32(4, 0x12345);

    expect(
      heap.getLU32(4)
    ).toEqual(
      0x12345
    );
  });
});
