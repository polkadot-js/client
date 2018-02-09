// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const env = require('../env');
const index = require('./index');

describe('memcpy', () => {
  let runtime;
  let memcpy;

  beforeEach(() => {
    runtime = env({ buffer: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]) });
    memcpy = index(runtime).memcpy;
  });

  it('copys the src to dst', () => {
    memcpy(4, 2, 3);

    expect(
      runtime.heap.get(0, 8).toString()
    ).toEqual('1,2,3,4,3,4,5,8');
  });
});
