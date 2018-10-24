// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { SectionItem } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';
import { BaseDb } from '@polkadot/db/types';
import { StorageMethod$Bn } from '../types';

import { bnToU8a, u8aToBn } from '@polkadot/util';

import createBase from './base';
import creator from '../key';

export default function decodeBn <T> (db: BaseDb, key: SectionItem<T>, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const createKey = creator(key);
  const base = createBase<BN | number>(db);

  return {
    del: (...keyParams: Array<Storage$Key$Value>): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams: Array<Storage$Key$Value>): BN =>
      u8aToBn(
        base.get(createKey(keyParams)), true
      ),
    set: (value: BN | number, ...keyParams: Array<Storage$Key$Value>): void =>
      base.set(createKey(keyParams), value, bnToU8a(value, bitLength, true)),
    onUpdate: (updater: (value: BN | number, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
