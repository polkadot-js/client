// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import env from '../environment';
import index from './index';

describe('malloc', () => {
  let runtime;
  let mem;

  beforeEach(() => {
    runtime = env();
    runtime.heap.setWasmMemory({ buffer: new Uint8Array(1024 * 1024) });

    mem = index(runtime);
  });

  it('allocates space', () => {
    mem.malloc(50);

    expect(
      runtime.heap.used().allocated
    ).toEqual(50);
  });

  it('deallocates space', () => {
    mem.free(mem.malloc(666));

    expect(
      runtime.heap.used().deallocated
    ).toEqual(666);
  });
});
