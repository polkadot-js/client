// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a, u8aToHex } from '@polkadot/util';
import testingPairs from '@polkadot/keyring/testingPairs';

import db from './index';

const keyring = testingPairs();

describe.skip('accountIndexOf', () => {
  let system;

  beforeEach(() => {
    const store = {
      '0x3fdd39812efee5f55228a7816cb4718e': hexToU8a('0x0100000000000000')
    };

    system = db({
      get: (key) => {
        return store[u8aToHex(key)] || new Uint8Array([]);
      },
      put: (key, value) => {
        store[u8aToHex(key)] = value;
      }
    }).system;
  });

  describe('get', () => {
    it('returns nonce', () => {
      expect(
        system.accountIndexOf.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(1);
    });

    it('returns zero nonces', () => {
      expect(
        system.accountIndexOf.get(keyring.bob.publicKey()).toNumber()
      ).toEqual(0);
    });
  });

  describe('set', () => {
    it('sets a nonce', () => {
      system.accountIndexOf.set(666, keyring.alice.publicKey());

      expect(
        system.accountIndexOf.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(666);
    });
  });
});
