// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Section$Item } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';
import { TrieDb } from '@polkadot/util-triedb/types';
import { StorageMethod$Bool } from '../types';

import createBase from './base';
import creator from '../key';

export default function decodeBool <T> (db: TrieDb, key: Section$Item<T>): StorageMethod$Bool {
  const createKey = creator(key);
  const base = createBase<boolean>(db);

  return {
    del: (...keyParams: Array<Storage$Key$Value>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<Storage$Key$Value>): boolean =>
      base.get(createKey(keyParams))[0] === 1,
    set: (value: boolean, ...keyParams: Array<Storage$Key$Value>): void =>
      base.set(createKey(keyParams), value, new Uint8Array([value ? 1 : 0])),
    onUpdate: (updater: (value: boolean, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
