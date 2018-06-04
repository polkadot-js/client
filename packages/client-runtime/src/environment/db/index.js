// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/client-db-chain/types';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { DbState } from './types';

const clear = require('./clear');
const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function envDb (backend: BaseDb): BaseDb {
  const self: DbState = {
    backend,
    pending: {}
  };

  return {
    clear: (): void =>
      clear(self),
    commit: (values: Trie$Pairs = []): void =>
      commit(self, values),
    del: (k: Uint8Array): void =>
      del(self, k),
    isEmpty: (): boolean =>
      Object.keys(self.pending).length === 0,
    get: (k: Uint8Array): Uint8Array | null =>
      get(self, k),
    pairs: (): Trie$Pairs =>
      pairs(self),
    set: (k: Uint8Array, v: Uint8Array): void =>
      set(self, k, v)
  };
};
