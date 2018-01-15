// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const Genesis = require('./genesis');

describe('Genesis', () => {
  it('assigns sane defaults', () => {
    expect(
      new Genesis({})
    ).toEqual({
      hash: '0x00'
    });
  });

  it('assigns supplied values', () => {
    expect(
      new Genesis({ hash: '0x1234' })
    ).toEqual({
      hash: '0x1234'
    });
  });
});
