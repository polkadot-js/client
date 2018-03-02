// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const key = require('./key');

describe('key', () => {
  it('concats the values', () => {
    expect(
      key(
        u8aFromString('sys:old:'),
        hexToU8a('0x0100000000000000')
      )
    ).toEqual(
      hexToU8a('0x3117ecd3eaa7a8c27cb8d04eb597a1ef')
    );
  });

  it('concats with empty key', () => {
    expect(
      key(
        u8aFromString('ses:llc')
      )
    ).toEqual(
      hexToU8a('0xe14daa763fce793346d4b7e131240849')
    );
  });

  it('does not hash when not required', () => {
    expect(
      key(
        u8aFromString(':code'),
        null,
        false
      )
    ).toEqual(
      u8aFromString(':code')
    );
  });
});
