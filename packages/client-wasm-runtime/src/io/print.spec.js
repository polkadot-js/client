// ISC, Copyright 2017-2018 Jaco Greeff

require('./polyfill');

const index = require('./index');

describe('print', () => {
  const TEST = 'Привет, мир!';
  let heap;
  let l;
  let print;

  beforeEach(() => {
    heap = {
      uint8: new TextEncoder('utf-8').encode(TEST)
    };
    l = {
      log: jest.fn(() => void 0)
    };
    print = index({ l, heap }).print;
  });

  it('logs the memory using the supplied logger', () => {
    print(0, heap.uint8.length);

    expect(
      l.log
    ).toHaveBeenCalledWith(TEST);
  });
});
