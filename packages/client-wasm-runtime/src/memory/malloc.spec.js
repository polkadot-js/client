// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('malloc', () => {
  let runtime;
  let malloc;

  beforeEach(() => {
    runtime = {
      heap: {
        freed: {
          0: 3,
          3: 120
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
