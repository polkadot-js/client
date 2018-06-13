// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const l = require('@polkadot/util/logger')('test');

const index = require('./index');
const envHeap = require('../environment/heap');

describe('memset', () => {
  let runtime;
  let memset;

  beforeEach(() => {
    runtime = {
      l,
      heap: envHeap()
    };
    runtime.heap.setWasmMemory({ buffer: new Uint8Array(5) });
    memset = index(runtime).memset;
  });

  it('sets the buffer to the correct values', () => {
    memset(0, 2, 3);

    expect(
      runtime.heap.get(0, 5).toString()
    ).toEqual('2,2,2,0,0');
  });
});
