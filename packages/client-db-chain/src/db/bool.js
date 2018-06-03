// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { StorageMethod$Bool, BaseDb } from '../types';

const creator = require('../key');

module.exports = function decodeBool <T> (db: BaseDb, key: Section$Item<T>): StorageMethod$Bool {
  const createKey = creator(key);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      db.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): boolean =>
      db.get(createKey(keyParams))[0] === 1,
    set: (value: boolean, ...keyParams?: Storage$Key$Values): void =>
      db.set(
        createKey(keyParams), new Uint8Array([value ? 1 : 0])
      )
  };
};
