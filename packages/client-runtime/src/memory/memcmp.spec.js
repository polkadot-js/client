// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import env from '../environment';
import index from '.';

describe('memcmp', () => {
  let runtime;
  let memcmp;

  beforeEach(() => {
    runtime = env();
    runtime.heap.setWasmMemory({ buffer: new Uint8Array([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]) });
    memcmp = index(runtime).memcmp;
  });

  it('returns 0 when arrays are equal', () => {
    expect(
      memcmp(0, 6, 4)
    ).toEqual(0);
  });

  it('returns -1 when first is lt', () => {
    expect(
      memcmp(0, 7, 4)
    ).toEqual(-1);
  });

  it('returns 1 when first is gt', () => {
    expect(
      memcmp(1, 6, 4)
    ).toEqual(1);
  });
});
