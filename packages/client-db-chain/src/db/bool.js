// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { StorageMethod$Bool } from '../types';

const createBase = require('./base');
const creator = require('../key');

module.exports = function decodeBool <T> (db: TrieDb, key: Section$Item<T>): StorageMethod$Bool {
  const createKey = creator(key);
  const base = createBase(db);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): boolean =>
      base.get(createKey(keyParams))[0] === 1,
    set: (value: boolean, ...keyParams?: Storage$Key$Values): void =>
      base.set(createKey(keyParams), value, new Uint8Array([value ? 1 : 0])),
    onUpdate: (updater: (value: boolean, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
};
