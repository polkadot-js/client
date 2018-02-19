// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const env = require('../environment');
const index = require('./index');

describe('malloc', () => {
  let runtime;
  let mem;

  beforeEach(() => {
    runtime = env({ buffer: new Uint8Array(512 * 1024) });

    mem = index(runtime);
  });

  it('allocates space', () => {
    mem.malloc(50);

    expect(
      runtime.heap.sizeAllocated()
    ).toEqual(50);
  });

  it('deallocates space', () => {
    mem.free(mem.malloc(666));

    expect(
      runtime.heap.sizeDeallocated()
    ).toEqual(666);
  });
});
