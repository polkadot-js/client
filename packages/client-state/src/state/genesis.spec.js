// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const Genesis = require('./genesis');

describe('Genesis', () => {
  it('assigns sane defaults', () => {
    expect(
      new Genesis({})
    ).toEqual({
      hash: hexToU8a('0x00', 256)
    });
  });

  it('assigns supplied values', () => {
    expect(
      new Genesis({
        hash: hexToU8a('0x1234', 256)
      })
    ).toEqual({
      hash: hexToU8a('0x1234', 256)
    });
  });
});
