// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { StorageMethod, StorageDef$Key$Values, StorageDef$Key, WrapDb } from '../types';
import type { Creator } from './types';

module.exports = function expandMethodBn (key: StorageDef$Key, createKey: Creator, db: WrapDb): StorageMethod {
  const bitLength = ['u32'].includes(key.type) ? 32 : 64;

  return ({
    getn: (...keyParams?: StorageDef$Key$Values): BN =>
      db.getn(createKey(keyParams), bitLength),
    setn: (value: BN | number, ...keyParams?: StorageDef$Key$Values): void =>
      db.setn(createKey(keyParams), value, bitLength)
  }: $Shape<StorageMethod>);
};
