// ISC, Copyright 2017 Jaco Greeff

const index = require('./index');

describe('memmove', () => {
  let runtime;
  let memmove;

  beforeEach(() => {
    runtime = {
      heap: {
        uint8: new Uint8Array([1, 2, 3, 4, 5])
      }
    };
    memmove = index(runtime).memmove;
  });

  it('copys the src to dest', () => {
    memmove(0, 2, 2);

    expect(
      runtime.heap.uint8.toString()
    ).toEqual('3,4,3,4,5');
  });
});
