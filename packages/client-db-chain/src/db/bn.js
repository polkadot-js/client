// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { StorageMethod$Bn, BaseDb } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToBn = require('@polkadot/util/u8a/toBn');

const creator = require('../key');

module.exports = function decodeBn <T> (db: BaseDb, key: Section$Item<T>, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const createKey = creator(key);

  return {
    get: (...keyParams?: Storage$Key$Values): BN =>
      u8aToBn(
        db.get(createKey(keyParams)), true
      ),
    set: (value: BN | number, ...keyParams?: Storage$Key$Values): void =>
      db.set(
        createKey(keyParams), bnToU8a(value, bitLength, true)
      )
  };
};
