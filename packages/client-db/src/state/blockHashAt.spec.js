// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a, u8aToHex } from '@polkadot/util';

import db from './index';

const TEST_HASH = hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf');

describe('blockHashAt', () => {
  let system;

  describe('get', () => {
    beforeEach(() => {
      const store = {
        '0x409f029eb7b3c4795f8d3c81e1b15d81a3': TEST_HASH
      };

      system = db({
        get: (key) => {
          console.log('retrieving', u8aToHex(key));

          return store[u8aToHex(key)] || new Uint8Array([]);
        },
        put: (value, key) => {
          console.log('setting', u8aToHex(key), value);

          store[u8aToHex(key)] = value;
        }
      });
    });

    it('returns hash as set', () => {
      expect(
        system.blockHashAt.get(1)
      ).toEqual(TEST_HASH);
    });
  });

  describe('set', () => {
    beforeEach(() => {
      const store = {};

      system = db({
        get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
        put: (key, value) => {
          store[u8aToHex(key)] = value;
        }
      });
    });

    it('sets hashes', () => {
      system.blockHashAt.set(new Uint8Array([123]), 5);

      expect(
        system.blockHashAt.get(5)
      ).toEqual(new Uint8Array([123]));
    });
  });
});
