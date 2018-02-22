// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const index = require('../index');

const TEST_HASH = hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf');

describe('getBlockHash', () => {
  let system;

  beforeEach(() => {
    system = index({
      get: (key) => {
        switch (u8aToHex(key)) {
          case '0x3117ecd3eaa7a8c27cb8d04eb597a1ef':
            return TEST_HASH;

          default:
            return new Uint8Array([]);
        }
      }
    }).system;
  });

  it('returns hash as set', () => {
    expect(
      system.getBlockHash(1)
    ).toEqual(TEST_HASH);
  });
});
