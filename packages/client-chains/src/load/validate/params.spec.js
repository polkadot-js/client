// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const validateParams = require('./params');

describe('validateParams', () => {
  it('validates the keys (strict)', () => {
    expect(
      validateParams({ booyaka: 123 })
    ).toEqual(true);
  });

  it('validates params as integer number', () => {
    expect(
      () => validateParams({ networkId: 123.123 })
    ).toThrow(/should be an integer/);
  });
});
