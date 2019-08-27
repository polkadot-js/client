// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$Bool } from '../types';

import createBase from './base';

export default function decodeBool (db: BaseDb, createKey: Function): StorageMethod$Bool {
  const base = createBase<boolean>(db);

  return {
    del: (keyParam: any): void =>
      base.del(createKey(keyParam)),
    get: (keyParam: any): boolean => {
      const value = base.get(createKey(keyParam));

      return value[0] === 1;
    },
    set: (value: boolean, keyParam: any): void =>
      base.set(createKey(keyParam), value, new Uint8Array([value ? 1 : 0])),
    onUpdate: (updater: (value: boolean, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
