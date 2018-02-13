// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('@polkadot/util/is/function');

const { createFn } = require('./index');

describe('createFn', () => {
  let int;
  let runtime;

  beforeEach(() => {
    let callId = 5;

    runtime = {
      environment: {
        heap: {
          allocate: jest.fn(() => ++callId),
          set: jest.fn((ptr) => ptr)
        }
      }
    };
    int = {
      test: jest.fn()
    };
  });

  it('returns a callable function', () => {
    expect(
      isFunction(
        createFn(int, 'test', runtime)
      )
    ).toEqual(true);
  });

  it('stores the inputs (upon call)', () => {
    createFn(int, 'test', runtime)(
      new Uint8Array([9, 8, 7]),
      new Uint8Array([1, 2, 3])
    );

    expect(
      runtime.environment.heap.set.mock.calls
    ).toEqual([
      [6, new Uint8Array([9, 8, 7])],
      [7, new Uint8Array([1, 2, 3])]
    ]);
  });

  it('passes the offsets & length (upon call)', () => {
    createFn(int, 'test', runtime)(
      new Uint8Array([9, 8, 7, 6, 5]),
      new Uint8Array([1, 2, 3])
    );

    expect(
      int.test
    ).toHaveBeenCalledWith(
      6, 5, // offset, length
      7, 3 // offset, length
    );
  });
});
