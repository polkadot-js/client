// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const envHeap = require('./index');

describe('fill', () => {
  let heap;

  beforeEach(() => {
    const buffer = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];

    heap = envHeap();
    heap.setWasmMemory({ buffer });
  });

  it('uses fill to set values', () => {
    expect(
      heap.fill(2, 5, 4)
    ).toEqual(
      new Uint8Array([0x0, 0x0, 0x5, 0x5, 0x5, 0x5, 0x0, 0x0])
    );
  });
});
