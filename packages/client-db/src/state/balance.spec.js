// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { hexToU8a, u8aToHex } from '@polkadot/util';
import testingPairs from '@polkadot/keyring/testingPairs';

import db from './index';

const keyring = testingPairs();

describe('balance', () => {
  let staking;

  describe('get', () => {
    beforeEach(() => {
      staking = db({

        get: (key) => {
          switch (u8aToHex(key)) {
            case '0x93b3a06afc9ac6777adff1f6ad2cd5d9':
              return hexToU8a('0x4500000000000000');

            case '0x8e4b46d94b25bb2f5c9fa65f60263160':
              return hexToU8a('0x2a00000000000000');

            default:
              return new Uint8Array([]);
          }
        }
      }).staking;
    });

    it('returns balances', () => {
      expect(
        staking.freeBalanceOf.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(42);

      expect(
        staking.freeBalanceOf.get(keyring.bob.publicKey()).toNumber()
      ).toEqual(69);
    });

    it('returns zero balances', () => {
      expect(
        staking.freeBalanceOf.get(keyring.charlie.publicKey()).toNumber()
      ).toEqual(0);
    });
  });

  describe('set', () => {
    beforeEach(() => {
      const store = {};

      staking = db({
        get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
        put: (key, value) => {
          store[u8aToHex(key)] = value;
        }
      }).staking;
    });

    it('sets balances', () => {
      staking.freeBalanceOf.set(123, keyring.alice.publicKey());

      expect(
        staking.freeBalanceOf.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(123);
    });
  });
});
