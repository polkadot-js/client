// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/trie-db/types';
import { StateDb } from '../types';

import storage from '@polkadot/storage/static';

import createU8a from '../db/u8a';

export default function createState (db: TrieDb): StateDb {
  return {
    db,
    blockHashAt: createU8a(db, storage.system.blockHashAt),
    code: createU8a(db, storage.substrate.code)
  };
}
