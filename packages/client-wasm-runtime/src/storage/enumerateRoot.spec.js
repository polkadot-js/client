// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const enumerateRoot = require('./enumerateRoot');

describe('enumerateRoot', () => {
  it('calculates a basic ennumerated root', () => {
    expect(
      enumerateRoot({}, [
        u8aFromString('doe'),
        u8aFromString('reindeer')
      ])
    ).toEqual(
      hexToU8a(
        '0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3'
      )
    );
  });
});
