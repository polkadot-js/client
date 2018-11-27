// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { StorageFunction } from '@polkadot/types/StorageKey';
import { StorageMethod$U8a } from '../types';

import createBase from './base';

export default function decodeU8a (db: BaseDb, createKey: StorageFunction): StorageMethod$U8a {
  const base = createBase<Uint8Array>(db);

  return {
    del: (...keyParams: Array<any>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<any>): Uint8Array =>
      base.get(createKey(keyParams)),
    set: (value: Uint8Array, ...keyParams: Array<any>): void =>
      base.set(createKey(keyParams), value, value),
    onUpdate: (updater: (value: Uint8Array, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
