// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$Bn } from '../types';

import { bnToU8a, u8aToBn } from '@polkadot/util';

import createBase from './base';

export default function decodeBn (db: BaseDb, createKey: Function, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const base = createBase<BN | number>(db);

  return {
    del: (keyParam: any): void =>
      base.del(createKey(keyParam)),
    get: (keyParam: any): BN =>
      u8aToBn(
        base.get(createKey(keyParam)), true
      ),
    set: (value: BN | number, keyParam: any): void =>
      base.set(createKey(keyParam), value, bnToU8a(value, bitLength, true)),
    onUpdate: (updater: (value: BN | number, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
