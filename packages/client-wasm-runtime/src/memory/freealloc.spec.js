// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const freealloc = require('./freealloc');

describe('freealloc', () => {
  let heap;

  beforeEach(() => {
    heap = {
      // ok, these don't make much sense as a layout, but it allows for sorting inside the actual findContaining function to find the first & smallest
      freed: {
        0: 200,
        3: 120,
        4: 120,
        122: 500
      },
      alloc: {}
    };
  });

  it('returns 0 when matching size is not found', () => {
    expect(
      freealloc(heap, 501)
    ).toEqual(0);
  });

  it('returns the smallest matching slot (exact)', () => {
    expect(
      freealloc(heap, 120)
    ).toEqual(3);
  });

  it('returns the smallest matching slot (lesser)', () => {
    expect(
      freealloc(heap, 100)
    ).toEqual(3);
  });

  it('removes the previous freed slot', () => {
    freealloc(heap, 100);

    expect(heap.freed[3]).not.toBeDefined();
  });

  it('adds the allocated slot', () => {
    freealloc(heap, 100);

    expect(heap.alloc[3]).toEqual(100);
  });
});
