// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Heap from '.';

describe('deallocate', () => {
  let heap;

  beforeEach(() => {
    heap = new Heap();

    heap.memory = {
      allocated: new Map([[123, 456]]),
      deallocated: new Map()
    };
  });

  it('throws when no allocation found', () => {
    expect(
      () => heap.deallocate(456)
    ).toThrow(/on unallocated memory/);
  });

  it('removes the allocation from the allocation table', () => {
    heap.deallocate(123);

    expect(
      heap.memory.allocated.size
    ).toEqual(0);
  });

  it('adds the allocation from the deallocated table', () => {
    heap.deallocate(123);

    expect(
      [...heap.memory.deallocated.entries()]
    ).toEqual([[123, 456]]);
  });
});
