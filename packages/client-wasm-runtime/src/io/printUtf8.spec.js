// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

const env = require('../env');
const index = require('./index');

describe('print_utf8', () => {
  const TEST = 'Привет, мир!';
  let heap;
  let l;
  let print_utf8;

  beforeEach(() => {
    const runtime = env({ buffer: u8aFromUtf8(TEST) });

    heap = runtime.heap;
    l = {
      log: jest.fn(() => void 0)
    };
    print_utf8 = index({ l, heap }).print_utf8;
  });

  it('logs the memory using the supplied logger', () => {
    print_utf8(0, heap.uint8.length);

    expect(
      l.log
    ).toHaveBeenCalledWith(TEST);
  });
});
