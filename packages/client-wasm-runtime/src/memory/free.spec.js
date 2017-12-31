// ISC, Copyright 2017 Jaco Greeff

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
