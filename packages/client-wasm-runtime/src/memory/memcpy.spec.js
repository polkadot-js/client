// ISC, Copyright 2017-2018 Jaco Greeff

const index = require('./index');

describe('memcpy', () => {
  let runtime;
  let memcpy;

  beforeEach(() => {
    runtime = {
      heap: {
        uint8: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      }
    };
    memcpy = index(runtime).memcpy;
  });

  it('copys the src to dst', () => {
    memcpy(4, 2, 3);

    expect(
      runtime.heap.uint8.toString()
    ).toEqual('1,2,3,4,3,4,5,8');
  });
});
