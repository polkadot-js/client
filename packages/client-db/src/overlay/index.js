// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '../types';
import type { Trie$Pairs } from '../trie/types';
import type { Memory$Storage } from '../memory/types';

const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function overlay (backend: BaseDbInterface): BaseDbInterface {
  let pending: Memory$Storage = {};

  return {
    clear: (): void => {
      pending = {};
    },
    commit: (values: Trie$Pairs = []): void => {
      commit(pending, backend, values);
      pending = {};
    },
    del: (k: Uint8Array): void =>
      del(pending, backend, k),
    get: (k: Uint8Array): Uint8Array =>
      get(pending, backend, k),
    pairs: (): Trie$Pairs =>
      pairs(pending, backend),
    set: (k: Uint8Array, v: Uint8Array): void =>
      set(pending, backend, k, v)
  };
};
