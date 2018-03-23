// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const chains = require('./chains');

describe('chains', () => {
  it('exports chains', () => {
    expect(
      Object.keys(chains).length > 0
    ).toEqual(true);
  });
});
