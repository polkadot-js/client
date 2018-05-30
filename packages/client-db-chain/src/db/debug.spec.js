// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createDb = require('../db');

describe('debug', () => {
  let state;

  beforeEach(() => {
    state = createDb({
      pairs: () => [
        { k: new Uint8Array([1, 2]), v: new Uint8Array([3, 4]) },
        { k: new Uint8Array([5, 6]), v: new Uint8Array([7, 8]) }
      ]
    }, {});
  });

  it('returns the keys and values', () => {
    expect(
      state.db.debug()
    ).toEqual({
      '1,2': '[3,4]',
      '5,6': '[7,8]'
    });
  });
});
