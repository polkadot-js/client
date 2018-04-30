// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/db/types';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { Memory$Storage } from './types';

const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function memory (): BaseDbInterface {
  let storage: Memory$Storage = {};

  return {
    clear: (): void => {
      storage = {};
    },
    commit: (values: Trie$Pairs = []): void =>
      commit(storage, values),
    del: (k: Uint8Array): void =>
      del(storage, k),
    isEmpty: (): boolean =>
      Object.keys(storage).length === 0,
    get: (k: Uint8Array): Uint8Array =>
      get(storage, k),
    pairs: (): Trie$Pairs =>
      pairs(storage),
    set: (k: Uint8Array, v: Uint8Array): void =>
      set(storage, k, v)
  };
};
