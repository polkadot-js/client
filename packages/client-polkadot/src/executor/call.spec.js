// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const l = require('@polkadot/util/logger')('test');
const isFunction = require('@polkadot/util/is/function');

const call = require('./call');

describe('call', () => {
  let instance;
  let runtime;

  beforeEach(() => {
    let callId = 5;

    runtime = {
      environment: {
        l,
        heap: {
          allocate: jest.fn(() => ++callId),
          set: jest.fn((ptr) => ptr)
        }
      }
    };
    instance = {
      test: jest.fn(() => 42),
      get_result_hi: jest.fn(() => 69)
    };
  });

  it('returns a callable function', () => {
    expect(
      isFunction(
        call(instance, runtime, 'test')
      )
    ).toEqual(true);
  });

  it('stores the inputs (upon call)', () => {
    call(instance, runtime, 'test')(
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
    call(instance, runtime, 'test')(
      new Uint8Array([9, 8, 7, 6, 5]),
      new Uint8Array([1, 2, 3])
    );

    expect(
      instance.test
    ).toHaveBeenCalledWith(
      6, 5, // offset, length
      7, 3 // offset, length
    );
  });

  it('returns the hi/lo result pair', () => {
    expect(
      call(instance, runtime, 'test')()
    ).toEqual({
      lo: 42,
      hi: 69
    });
  });
});
