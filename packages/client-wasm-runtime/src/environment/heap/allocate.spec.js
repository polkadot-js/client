// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const allocate = require('./allocate');

describe('allocate', () => {
  let memory;

  beforeEach(() => {
    memory = {
      deallocated: {
        0: 3,
        3: 120
      },
      allocated: {},
      offset: 150,
      size: 250
    };
  });

  it('returns 0 when size is 0', () => {
    expect(
      allocate(memory, 0)
    ).toEqual(0);
  });

  it('returns 0 when requested is > available', () => {
    expect(
      allocate(memory, 1024)
    ).toEqual(0);
  });

  it('returns a pointer as allocated', () => {
    expect(
      allocate(memory, 100)
    ).toEqual(150);
  });

  it('adds the allocated map to the alloc heap section', () => {
    allocate(memory, 100);

    expect(memory.allocated).toEqual({ 150: 100 });
  });

  it('updates the internal offset for next allocation', () => {
    allocate(memory, 20);

    expect(
      allocate(memory, 50)
    ).toEqual(170);
  });

  it('re-allocates previous de-allocated spece', () => {
    expect(
      allocate(memory, 120)
    ).toEqual(3);
  });
});
