// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { TrieDb } from '@polkadot/util-triedb/types';
import type { Trie$Pair } from '@polkadot/util-triehash/types';

type Trie$Pair$Null = {
  k: Uint8Array,
  v: Uint8Array | null
};

export type DbState = {
  backend: TrieDb,
  pending: {
    [Uint8Array]: Trie$Pair | Trie$Pair$Null
  }
};
