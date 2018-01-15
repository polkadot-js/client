// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

const env = require('../env');
const index = require('./index');

describe('print', () => {
  const TEST = 'Привет, мир!';
  let heap;
  let l;
  let print;

  beforeEach(() => {
    const runtime = env({ buffer: u8aFromUtf8(TEST) });

    heap = runtime.heap;
    l = {
      log: jest.fn(() => void 0)
    };
    print = index({ l, heap }).print;
  });

  it('logs the memory using the supplied logger', () => {
    print(0, heap.uint8.length);

    expect(
      l.log
    ).toHaveBeenCalledWith(TEST);
  });
});
