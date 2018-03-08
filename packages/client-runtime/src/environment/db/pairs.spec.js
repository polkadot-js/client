// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('pairs', () => {
  let backend;

  beforeEach(() => {
    backend = {
      pairs: jest.fn(() => [
        { k: new Uint8Array([1]), v: new Uint8Array([0]) },
        { k: new Uint8Array([3]), v: new Uint8Array([3]) },
        { k: new Uint8Array([4]), v: new Uint8Array([4]) }
      ])
    };
  });

  it('retrieves pending and backend pairs', () => {
    const int = index(backend);

    int.set(new Uint8Array([1]), new Uint8Array([1]));
    int.set(new Uint8Array([2]), new Uint8Array([2]));

    expect(
      int.pairs()
    ).toEqual([
      { k: new Uint8Array([1]), v: new Uint8Array([0]) },
      { k: new Uint8Array([3]), v: new Uint8Array([3]) },
      { k: new Uint8Array([4]), v: new Uint8Array([4]) },
      { k: new Uint8Array([1]), v: new Uint8Array([1]) },
      { k: new Uint8Array([2]), v: new Uint8Array([2]) }
    ]);
  });

  it('retrieves pending only', () => {
    const int = index();

    int.set(new Uint8Array([1]), new Uint8Array([1]));
    int.set(new Uint8Array([2]), new Uint8Array([2]));

    expect(
      int.pairs()
    ).toEqual([
      { k: new Uint8Array([1]), v: new Uint8Array([1]) },
      { k: new Uint8Array([2]), v: new Uint8Array([2]) }
    ]);
  });
});
