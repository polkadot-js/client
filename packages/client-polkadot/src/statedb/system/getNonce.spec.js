// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');
const keyring = require('@polkadot/util-keyring/testing')();

const index = require('../index');

describe('getNonce', () => {
  let system;

  beforeEach(() => {
    system = index({
      get: (key) => {
        switch (u8aToHex(key)) {
          case '0xc7f790aa4fc95a8813b0d5734a8c195b':
            return hexToU8a('0x0100000000000000');

          default:
            return new Uint8Array([]);
        }
      }
    }).system;
  });

  it('returns nonce', () => {
    expect(
      system.getNonce(keyring.one.publicKey).toNumber()
    ).toEqual(1);
  });

  it('returns zero nonces', () => {
    expect(
      system.getNonce(keyring.alice.publicKey).toNumber()
    ).toEqual(0);
  });
});
