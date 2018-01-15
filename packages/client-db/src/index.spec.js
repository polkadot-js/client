// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const DB = require('./');

describe('index', () => {
  it('exports the DB class', () => {
    expect(
      DB
    ).toBeDefined();
  });
});
