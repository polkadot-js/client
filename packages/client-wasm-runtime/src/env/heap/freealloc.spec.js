// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const freealloc = require('./freealloc');

describe('freealloc', () => {
  let memory;

  beforeEach(() => {
    memory = {
      allocated: {},
      // ok, these don't make much sense as a layout, but it allows for sorting inside the actual findContaining function to find the first & smallest
      freed: {
        0: 200,
        3: 120,
        4: 120,
        122: 500
      }
    };
  });

  it('returns 0 when matching size is not found', () => {
    expect(
      freealloc(memory, 501)
    ).toEqual(0);
  });

  it('returns the smallest matching slot (exact)', () => {
    expect(
      freealloc(memory, 120)
    ).toEqual(3);
  });

  it('returns the smallest matching slot (lesser)', () => {
    expect(
      freealloc(memory, 100)
    ).toEqual(3);
  });

  it('removes the previous freed slot', () => {
    freealloc(memory, 100);

    expect(memory.freed[3]).not.toBeDefined();
  });

  it('adds the allocated slot', () => {
    freealloc(memory, 100);

    expect(memory.allocated[3]).toEqual(100);
  });
});
