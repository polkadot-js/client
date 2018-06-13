// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { StorageMethod$ArrayU8a } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aConcat = require('@polkadot/util/u8a/concat');
const u8aToBn = require('@polkadot/util/u8a/toBn');

const creator = require('../key');

module.exports = function decodeArrayU8a <T> (db: TrieDb, key: Section$Item<T>): StorageMethod$ArrayU8a {
  const createKey = creator(key);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      db.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): Array<Uint8Array> => {
      const u8a = db.get(createKey(keyParams));

      if (u8a === null) {
        return [];
      }

      const length = u8aToBn(u8a.subarray(0, 4)).toNumber();
      const result = [];

      for (let index = 0, offset = 4; index < length; index++, offset += 32) {
        result.push(u8a.subarray(offset, offset + 32));
      }

      return result;
    },
    set: (value: Array<Uint8Array>, ...keyParams?: Storage$Key$Values): void =>
      db.set(createKey(keyParams), u8aConcat(
        bnToU8a(value.length, 32, true),
        u8aConcat.apply(null, value))
      ),
    onUpdate: (updater: (value: Array<Uint8Array>, raw: Uint8Array) => void): void => {
      throw new Error(`No subscriber available for db/arrayU8a`);
    }
  };
};
