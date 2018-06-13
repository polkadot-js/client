// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');
const keyring = require('@polkadot/util-keyring/testingPairs')();

const db = require('./index');

describe('balance', () => {
  let staking;

  describe('get', () => {
    beforeEach(() => {
      staking = db({
        get: (key) => {
          switch (u8aToHex(key)) {
            case '0xb51ac18fd0242fd7fd033de43fd2940f':
              return hexToU8a('0x4500000000000000');

            case '0xd1ab535c242e3418ab4da2cb5aaa80a6':
              return hexToU8a('0x2a00000000000000');

            default:
              return new Uint8Array([]);
          }
        }
      }).staking;
    });

    it('returns balances', () => {
      expect(
        staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
      ).toEqual(42);

      expect(
        staking.freeBalanceOf.get(keyring.two.publicKey()).toNumber()
      ).toEqual(69);
    });

    it('returns zero balances', () => {
      expect(
        staking.freeBalanceOf.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(0);
    });
  });

  describe('set', () => {
    beforeEach(() => {
      const store = {};

      staking = db({
        get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
        set: (key, value) => {
          store[u8aToHex(key)] = value;
        }
      }).staking;
    });

    it('sets balances', () => {
      staking.freeBalanceOf.set(123, keyring.one.publicKey());

      expect(
        staking.freeBalanceOf.get(keyring.one.publicKey()).toNumber()
      ).toEqual(123);
    });
  });
});
