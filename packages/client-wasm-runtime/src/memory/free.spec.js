// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('free', () => {
  let runtime;
  let free;

  beforeEach(() => {
    runtime = {
      heap: {
        alloc: { 123: 456 },
        freed: {}
      }
    };
    free = index(runtime).free;
  });

  it('throws when no allocation found', () => {
    expect(
      () => free(456)
    ).toThrow(/on unallocated memory/);
  });

  it('removes the allocation from the allocation table', () => {
    free(123);

    expect(
      runtime.heap.alloc
    ).toEqual({});
  });

  it('adds the allocation from the freed table', () => {
    free(123);

    expect(
      runtime.heap.freed
    ).toEqual({ 123: 456 });
  });
});
