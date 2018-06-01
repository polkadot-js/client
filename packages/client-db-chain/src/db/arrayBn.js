// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Section$Item } from '@polkadot/params/types';
import type { Storage$Key$Values } from '@polkadot/storage/types';
import type { StorageMethod$ArrayBn, BaseDb } from '../types';

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToBn = require('@polkadot/util/u8a/toBn');

const arrayU8a = require('./arrayU8a');

module.exports = function decodeArrayBn <T> (db: BaseDb, key: Section$Item<T>, bitLength: 32 | 64 | 128): StorageMethod$ArrayBn {
  const base = arrayU8a(db, key);

  return {
    get: (...keyParams?: Storage$Key$Values): Array<BN> =>
      base.get
        .apply(null, keyParams)
        .map((value) =>
          u8aToBn(value, true)
        ),
    set: (value: Array<BN | number>, ...keyParams?: Storage$Key$Values): void =>
      base.set.apply(
        null, [ value.map((value) =>
          bnToU8a(value, bitLength, true)
        ) ].concat(keyParams)
      )
  };
};
