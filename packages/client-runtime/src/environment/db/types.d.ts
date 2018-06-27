// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/util-triedb/types';
import { Trie$Pair } from '@polkadot/trie-hash/types';

type Trie$Pair$Null = {
  k: Uint8Array,
  v: Uint8Array | null
};

export type DbState = {
  backend: TrieDb,
  pending: {
    [index: string]: Trie$Pair | Trie$Pair$Null
  }
};
