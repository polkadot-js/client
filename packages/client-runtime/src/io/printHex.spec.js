// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const env = require('../environment');
const index = require('./index');

describe('print_hex', () => {
  let heap;
  let l;
  let print_hex;

  beforeEach(() => {
    const runtime = env();

    heap = runtime.heap;
    heap.setWasmMemory({ buffer: new Uint8Array([0x1, 0x3, 0x5, 0x7, 0x99]) });

    l = {
      debug: jest.fn((cb) => cb()),
      log: jest.fn(() => void 0)
    };
    print_hex = index({ l, heap }).print_hex;
  });

  it('logs the memory using the supplied logger', () => {
    print_hex(0, 5);

    expect(
      l.log
    ).toHaveBeenCalledWith('0x0103050799');
  });
});
