// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('clear', () => {
  let backend;
  let int;

  beforeEach(() => {
    backend = {
      get: jest.fn(() => new Uint8Array([3]))
    };

    int = index(backend);
  });

  it('clears all set values', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));
    int.clear();

    expect(
      int.isEmpty()
    ).toEqual(true);
  });
});
