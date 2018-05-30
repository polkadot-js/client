// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Section$Item } from '@polkadot/params/types';
import type { StorageMethod$Bn, Storage$Key$Values, WrapDb } from '../types';

const creator = require('../key');

module.exports = function decodeBn <T> (key: Section$Item<T>, db: WrapDb, bitLength: 32 | 64 | 128): StorageMethod$Bn {
  const createKey = creator(key);

  return {
    get: (...keyParams?: Storage$Key$Values): BN =>
      db.getn(createKey(keyParams), bitLength),
    set: (value: BN | number, ...keyParams?: Storage$Key$Values): void =>
      db.setn(createKey(keyParams), value, bitLength)
  };
};
