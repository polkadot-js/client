// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/util-triedb/types';
import { Trie$Pairs } from '@polkadot/util-triehash/types';
import { DbState } from './types';

import trieRoot from '@polkadot/util-triehash/root';

import clear from './clear';
import commit from './commit';
import del from './del';
import get from './get';
import pairs from './pairs';
import set from './set';

export default function envDb (backend: TrieDb): TrieDb {
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
      set(self, k, v),
    trieRoot: (): Uint8Array =>
      trieRoot(pairs(self))
  };
}
