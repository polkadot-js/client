// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { SectionItem } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';
import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$Bool } from '../types';

import createBase from './base';
import creator from '../key';

export default function decodeBool <T> (db: BaseDb, key: SectionItem<T>): StorageMethod$Bool {
  const createKey = creator(key);
  const base = createBase<boolean>(db);

  return {
    del: (...keyParams: Array<Storage$Key$Value>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<Storage$Key$Value>): boolean => {
      const value = base.get(createKey(keyParams));

      return value[0] === 1;
    },
    set: (value: boolean, ...keyParams: Array<Storage$Key$Value>): void =>
      base.set(createKey(keyParams), value, new Uint8Array([value ? 1 : 0])),
    onUpdate: (updater: (value: boolean, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
