// ISC, Copyright 2017 Jaco Greeff

const index = require('./index');

describe('malloc', () => {
  let runtime;
  let malloc;

  beforeEach(() => {
    runtime = {
      heap: {
        // ok, these don't make much sense, but it allows for sorting inside the actual findFree function (the one being tested later on) to find the first & smallest
        freed: {
          0: 200,
          3: 120,
          4: 120,
          122: 500
        },
        alloc: {},
        offset: 150,
        size: 250
      }
    };
    malloc = index(runtime).malloc;
  });

  it('returns 0 when size is 0', () => {
    expect(
      malloc(0)
    ).toEqual(0);
  });

  it('returns 0 when requested is > available', () => {
    expect(
      malloc(1024)
    ).toEqual(0);
  });

  it('returns a pointer as allocated', () => {
    expect(
      malloc(100)
    ).toEqual(150);
  });

  it('adds the allocated map to the alloc heap section', () => {
    malloc(100);

    expect(runtime.heap.alloc).toEqual({ 150: 100 });
  });

  it('updates the internal offset for next allocation', () => {
    malloc(20);

    expect(
      malloc(50)
    ).toEqual(170);
  });

  it('re-allocates previous de-allocated spece', () => {
    expect(
      malloc(120)
    ).toEqual(3);
  });
});
