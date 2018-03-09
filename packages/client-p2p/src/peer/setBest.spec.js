// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const setBest = require('./setBest');

describe('setBest', () => {
  let self;

  beforeEach(() => {
    self = {};
  });

  it('sets the number & hash', () => {
    setBest(self, 'number', 'hash');

    expect(
      self
    ).toEqual({
      bestHash: 'hash',
      bestNumber: 'number'
    });
  });
});
