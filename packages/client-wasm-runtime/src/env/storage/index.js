// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Trie$Pairs } from '@polkadot/client-db/trie/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';

const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function envStorage (backend: BaseDbInterface): BaseDbInterface {
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
    isEmpty: (): boolean =>
      Object.keys(pending).length === 0,
    get: (k: Uint8Array): Uint8Array =>
      get(pending, backend, k),
    pairs: (): Trie$Pairs =>
      pairs(pending, backend),
    set: (k: Uint8Array, v: Uint8Array): void =>
      set(pending, backend, k, v)
  };
};
