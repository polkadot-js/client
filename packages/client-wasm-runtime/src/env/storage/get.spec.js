// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('get', () => {
  let int;

  beforeEach(() => {
    int = index({});
  });

  it('retrieves a value', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));

    expect(
      int.get(new Uint8Array([1]))
    ).toEqual(
      new Uint8Array([2])
    );
  });
});
