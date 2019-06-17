// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Heap from '.';

describe('freealloc', () => {
  let heap;

  beforeEach(() => {
    heap = new Heap();
    heap.memory = {
      allocated: new Map(),
      // ok, these don't make much sense as a layout, but it allows for sorting inside the actual findContaining function to find the first & smallest
      deallocated: new Map([
        [0, 200],
        [3, 120],
        [4, 120],
        [122, 500]
      ])
    };
  });

  it('returns 0 when matching size is not found', () => {
    expect(
      heap.freealloc(501)
    ).toEqual(0);
  });

  it('returns the smallest matching slot (exact)', () => {
    expect(
      heap.freealloc(120)
    ).toEqual(3);
  });

  it('returns the smallest matching slot (lesser)', () => {
    expect(
      heap.freealloc(100)
    ).toEqual(3);
  });

  it('removes the previous deallocated slot', () => {
    heap.freealloc(100);

    expect(heap.memory.deallocated.get(3)).not.toBeDefined();
  });

  it('adds the allocated slot', () => {
    heap.freealloc(100);

    expect(heap.memory.allocated.get(3)).toEqual(100);
  });
});
