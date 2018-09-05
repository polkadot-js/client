// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import u8aFromUtf8 from '@polkadot/util/u8a/fromUtf8';

import env from '../environment';
import index from './index';

describe('print_utf8', () => {
  const TEST = 'Привет, мир!';
  let heap;
  let l;
  let print_utf8;

  beforeEach(() => {
    const runtime = env();

    heap = runtime.heap;
    heap.setWasmMemory({ buffer: u8aFromUtf8(TEST) });

    l = {
      debug: jest.fn((cb) => cb()),
      warn: jest.fn(() => void 0)
    };
    print_utf8 = index({ l, heap }).print_utf8;
  });

  it('logs the memory using the supplied logger', () => {
    print_utf8(0, heap.size());

    expect(
      l.warn
    ).toHaveBeenCalledWith(TEST);
  });
});
