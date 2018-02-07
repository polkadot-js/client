// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const index = require('./index');

describe('del', () => {
  let int;

  beforeEach(() => {
    int = index({});
  });

  it('removes a set value', () => {
    int.set(new Uint8Array([1]), new Uint8Array([2]));
    int.del(new Uint8Array([1]));

    expect(
      int.get(new Uint8Array([1]))
    ).toEqual(
      new Uint8Array([])
    );
  });
});
