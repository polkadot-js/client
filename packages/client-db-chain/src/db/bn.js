// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { StorageMethod$Bn } from '../types';

import bnToU8a from '@polkadot/util/bn/toU8a';
import u8aToBn from '@polkadot/util/u8a/toBn';

import createBase from './base';
import creator from '../key';

export default function decodeBn <T> (db: TrieDb, key: Section$Item<T>, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const createKey = creator(key);
  const base = createBase(db);

  return {
    del: (...keyParams?: Storage$Key$Values): void =>
      base.del(createKey(keyParams)),
    get: (...keyParams?: Storage$Key$Values): BN =>
      u8aToBn(
        base.get(createKey(keyParams)), true
      ),
    set: (value: BN | number, ...keyParams?: Storage$Key$Values): void =>
      base.set(createKey(keyParams), value, bnToU8a(value, bitLength, true)),
    onUpdate: (updater: (value: BN | number, raw: Uint8Array) => void): void =>
      base.onUpdate(updater)
  };
}
