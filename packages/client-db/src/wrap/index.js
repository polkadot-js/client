// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface, WrapDbInterface } from '../types';

const getBn = require('./getBn');
const setBn = require('./setBn');

module.exports = function wrap (db: BaseDbInterface): WrapDbInterface {
  const { clear, commit, del, isEmpty, get, pairs, set } = db;

  return {
    clear,
    commit,
    del,
    isEmpty,
    get,
    pairs,
    set,
    getBn: (key: Uint8Array, bitLength?: number): BN =>
      getBn(db, key, bitLength),
    setBn: (key: Uint8Array, value: BN | number, bitLength?: number): void =>
      setBn(db, key, value, bitLength)
  };
};
