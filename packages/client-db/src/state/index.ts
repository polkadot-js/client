// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/trie-db/types';
import { StateDb } from '../types';

import storage from '@polkadot/storage';

import createU8a from '../db/u8a';

export default function createState (db: TrieDb): StateDb {
  return {
    db,
    blockHashAt: createU8a(db, storage.system.public.blockHashAt),
    code: createU8a(db, storage.consensus.public.code)
  };
}
