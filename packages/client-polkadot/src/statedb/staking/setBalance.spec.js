// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aToHex = require('@polkadot/util/u8a/toHex');
const keyring = require('@polkadot/util-keyring/testing')();

const index = require('../index');

describe('setBalance', () => {
  let staking;

  beforeEach(() => {
    const store = {};

    staking = index({
      get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
      set: (key, value) => {
        store[u8aToHex(key)] = value;
      }
    }).staking;
  });

  it('sets balances', () => {
    staking.setBalance(keyring.one.publicKey, 123);

    expect(
      staking.getBalance(keyring.one.publicKey).toNumber()
    ).toEqual(123);
  });
});
