// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const deallocate = require('./deallocate');

describe('deallocate', () => {
  let memory;

  beforeEach(() => {
    memory = {
      allocated: { 123: 456 },
      deallocated: {}
    };
  });

  it('throws when no allocation found', () => {
    expect(
      () => deallocate(memory, 456)
    ).toThrow(/on unallocated memory/);
  });

  it('removes the allocation from the allocation table', () => {
    deallocate(memory, 123);

    expect(
      memory.allocated
    ).toEqual({});
  });

  it('adds the allocation from the deallocated table', () => {
    deallocate(memory, 123);

    expect(
      memory.deallocated
    ).toEqual({ 123: 456 });
  });
});
