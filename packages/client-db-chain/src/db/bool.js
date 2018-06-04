// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { StorageMethod$Bool, BaseDb } from '../types';

const u8a = require('./u8a');

module.exports = function decodeBool <T> (db: BaseDb, key: Section$Item<T>): StorageMethod$Bool {
  const base = u8a(db, key);

  return {
    del: base.del,
    get: (...keyParams?: Storage$Key$Values): boolean =>
      base.get.apply(null, keyParams)[0] === 1,
    set: (value: boolean, ...keyParams?: Storage$Key$Values): void =>
      base.set.apply(
        null, [new Uint8Array([value ? 1 : 0])].concat(keyParams)
      )
  };
};
