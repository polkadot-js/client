/* eslint-disable @typescript-eslint/camelcase */
// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import env from '../environment';
import index from '.';

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
      warn: jest.fn(() => {})
    };
    print_hex = index({ l, heap }).print_hex;
  });

  it('logs the memory using the supplied logger', () => {
    print_hex(0, 5);

    expect(
      l.warn
    ).toHaveBeenCalledWith('0x0103050799');
  });
});
