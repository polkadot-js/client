// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDb, WrapDb } from '../types';

const trieRoot = require('@polkadot/util-triehash/root');

const debug = require('./debug');
const getn = require('./getn');
const setn = require('./setn');

module.exports = function wrap (db: BaseDb): WrapDb {
  const { clear, commit, del, isEmpty, get, pairs, set } = db;

  return {
    clear,
    commit,
    del,
    isEmpty,
    get,
    pairs,
    set,
    debug: (): { [string]: string } =>
      debug(db),
    getn: (key: Uint8Array, bitLength?: number): BN =>
      getn(db, key, bitLength),
    setn: (key: Uint8Array, value: BN | number, bitLength?: number): void =>
      setn(db, key, value, bitLength),
    trieRoot: (): Uint8Array =>
      trieRoot(db.pairs())
  };
};
