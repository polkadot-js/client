// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$U8a } from '../types';

import createBase from './base';

export default function decodeU8a (db: BaseDb, createKey: Function): StorageMethod$U8a {
  const base = createBase<Uint8Array>(db);

  return {
    del: (keyParam: any): void =>
      base.del(createKey(keyParam)),
    get: (keyParam: any): Uint8Array =>
      base.get(createKey(keyParam)),
    set: (value: Uint8Array, keyParam: any): void =>
      base.set(createKey(keyParam), value, value),
    onUpdate: (updater: (value: Uint8Array, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
