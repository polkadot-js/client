// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';

const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function envDb (backend: BaseDbInterface): BaseDbInterface {
  let pending: Memory$Storage = {};
  const clear = (): void => {
    pending = {};
  };

  return {
    clear,
    commit: (values: Trie$Pairs = []): void => {
      commit(pending, backend, values);
      clear();
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
