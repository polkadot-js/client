// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { StorageMethod$U8a } from '../types';

import creator from '../key';
import createBase from './base';

export default function decodeU8a <T> (db: TrieDb, key: Section$Item<T>): StorageMethod$U8a {
  const createKey = creator(key);
  const base = createBase(db);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): Uint8Array =>
      base.get(createKey(keyParams)),
    set: (value: Uint8Array, ...keyParams?: Storage$Key$Values): void =>
      base.set(createKey(keyParams), value, value),
    onUpdate: (updater: (value: Uint8Array, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
