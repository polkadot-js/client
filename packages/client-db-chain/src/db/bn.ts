// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { SectionItem } from '@polkadot/params/types';
import { Storage$Key$Value } from '@polkadot/storage/types';
import { AsyncBaseDb } from '@polkadot/client-db/types';
import { StorageMethod$Bn } from '../types';

import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aToBn from '@polkadot/util/u8a/toBn';

import createBase from './base';
import creator from '../key';

export default function decodeBn <T> (db: AsyncBaseDb, key: SectionItem<T>, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const createKey = creator(key);
  const base = createBase<BN | number>(db);

  return {
    del: (...keyParams: Array<Storage$Key$Value>): Promise<void> =>
      base.del(createKey(keyParams)),
    get: async (...keyParams: Array<Storage$Key$Value>): Promise<BN> =>
      u8aToBn(
        await base.get(createKey(keyParams)), true
      ),
    set: (value: BN | number, ...keyParams: Array<Storage$Key$Value>): Promise<void> =>
      base.set(createKey(keyParams), value, bnToU8a(value, bitLength, true)),
    onUpdate: (updater: (value: BN | number, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
