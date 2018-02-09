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

  it('uses dup to return a section', () => {
    expect(
      heap.dup(0, 5)
    ).toEqual(
      new Uint8Array([0x1, 0x2, 0x3, 0x4, 0x0])
    );
  });
});
