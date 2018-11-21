// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { BaseDb } from '@polkadot/db/types';
import { StorageFunction } from '@polkadot/types/StorageKey';
import { StorageMethod$Bn } from '../types';

import { bnToU8a, u8aToBn } from '@polkadot/util';

import createBase from './base';

export default function decodeBn (db: BaseDb, createKey: StorageFunction, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const base = createBase<BN | number>(db);

  return {
    del: (...keyParams: Array<any>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<any>): BN =>
      u8aToBn(
        base.get(createKey(keyParams)), true
      ),
    set: (value: BN | number, ...keyParams: Array<any>): void =>
      base.set(createKey(keyParams), value, bnToU8a(value, bitLength, true)),
    onUpdate: (updater: (value: BN | number, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
