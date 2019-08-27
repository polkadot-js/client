/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { stringToU8a } from '@polkadot/util';

import env from '../environment';
import index from '.';

describe('print_utf8', () => {
  const TEST = 'Привет, мир!';
  let heap;
  let l;
  let print_utf8;

  beforeEach(() => {
    const runtime = env();

    heap = runtime.heap;
    heap.setWasmMemory({ buffer: stringToU8a(TEST) });

    l = {
      debug: jest.fn((cb) => cb()),
      warn: jest.fn(() => {})
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
