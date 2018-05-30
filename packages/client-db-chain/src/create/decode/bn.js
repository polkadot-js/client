// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { StorageMethod, Storage$Key$Values, WrapDb } from '../../types';
import type { Creator } from '../types';

module.exports = function decodeBn (createKey: Creator, db: WrapDb, bitLength: number): StorageMethod<BN> {
  return ({
    get: (...keyParams?: Storage$Key$Values): BN =>
      db.getn(createKey(keyParams), bitLength),
    set: (value: BN | number, ...keyParams?: Storage$Key$Values): void =>
      db.setn(createKey(keyParams), value, bitLength)
  }: $Shape<StorageMethod<BN>>);
};
