// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { hexToU8a, u8aToHex } from '@polkadot/util';

import db from './index';

const TEST_HASH = hexToU8a('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf');

describe('blockHash', () => {
  let system;

  describe('get', () => {
    beforeEach(() => {
      const store = {
        '0xfe7a071d703c0bb0ba5ccba2cef1b8aa': TEST_HASH
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
      }).system;
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
      }).system;
    });

    it('sets hashes', () => {
      system.blockHashAt.set(new Uint8Array([123]), 5);

      expect(
        system.blockHashAt.get(5)
      ).toEqual(new Uint8Array([123]));
    });
  });
});
