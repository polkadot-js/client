// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { StorageMethod$U8a, BaseDb } from '../types';

const creator = require('../key');

module.exports = function decodeU8a <T> (db: BaseDb, key: Section$Item<T>): StorageMethod$U8a {
  const createKey = creator(key);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      db.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): Uint8Array =>
      db.get(createKey(keyParams)) || new Uint8Array([]),
    set: (value: Uint8Array, ...keyParams?: Storage$Key$Values): void =>
      db.set(createKey(keyParams), value)
  };
};
