// ISC, Copyright 2017-2018 Jaco Greeff

const env = require('../env');
const index = require('./index');

describe('memmove', () => {
  let runtime;
  let memmove;

  beforeEach(() => {
    runtime = env({ buffer: new Uint8Array([1, 2, 3, 4, 5]) });
    memmove = index(runtime).memmove;
  });

  it('copys the src to dst', () => {
    memmove(0, 2, 2);

    expect(
      runtime.heap.uint8.toString()
    ).toEqual('3,4,3,4,5');
  });
});
