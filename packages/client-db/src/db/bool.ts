// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { StorageFunction } from '@polkadot/types/StorageKey';
import { StorageMethod$Bool } from '../types';

import createBase from './base';

export default function decodeBool (db: BaseDb, createKey: StorageFunction): StorageMethod$Bool {
  const base = createBase<boolean>(db);

  return {
    del: (...keyParams: Array<any>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<any>): boolean => {
      const value = base.get(createKey(keyParams));

      return value[0] === 1;
    },
    set: (value: boolean, ...keyParams: Array<any>): void =>
      base.set(createKey(keyParams), value, new Uint8Array([value ? 1 : 0])),
    onUpdate: (updater: (value: boolean, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
