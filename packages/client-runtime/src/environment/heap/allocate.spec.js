// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Heap from './index';

describe('allocate', () => {
  let heap;

  beforeEach(() => {
    heap = new Heap();

    heap.memory = {
      deallocated: {
        0: 3,
        3: 166
      },
      allocated: {},
      end: 110,
      offset: 100,
      size: 250
    };
  });

  it('returns 0 when size is 0', () => {
    expect(
      heap.allocate(0)
    ).toEqual(0);
  });

  it('returns 0 when requested is > available', () => {
    expect(
      heap.allocate(1024)
    ).toEqual(0);
  });

  it('returns a pointer as allocated', () => {
    expect(
      heap.allocate(100)
    ).toEqual(100);
  });

  it('adds the allocated map to the alloc heap section', () => {
    heap.allocate(100);

    expect(heap.memory.allocated).toEqual({ 100: 100 });
  });

  it('updates the internal offset for next allocation', () => {
    heap.allocate(20);

    expect(
      heap.allocate(50)
    ).toEqual(120);
  });

  it('re-allocates previous de-allocated space', () => {
    expect(
      heap.allocate(166)
    ).toEqual(3);
  });
});
