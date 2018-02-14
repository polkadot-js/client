// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const l = require('@polkadot/util/logger')('test');

const index = require('./index');

describe('memset', () => {
  let runtime;
  let memset;

  beforeEach(() => {
    runtime = {
      l,
      heap: {
        uint8: new Uint8Array(5)
      }
    };
    memset = index(runtime).memset;
  });

  it('sets the buffer to the correct values', () => {
    memset(0, 2, 3);

    expect(
      runtime.heap.uint8.toString()
    ).toEqual('2,2,2,0,0');
  });
});
