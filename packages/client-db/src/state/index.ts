// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TrieEntry } from '@polkadot/trie-db/types';
import { StateDb } from '../types';

import BN from 'bn.js';
import TrieDb from '@polkadot/trie-db';

export default function createState (db: TrieDb): StateDb {
  // eslint-disable-next-line prefer-const
  let _db: TrieDb = db;

  return {
    get db (): TrieDb {
      return _db;
    },

    getRootEntry (): TrieEntry | null {
      return _db.getEntry(_db.getRoot());
    },

    getRoot (): Uint8Array {
      return _db.getRoot();
    },

    setRoot (root: Uint8Array): void {
      _db.setRoot(root);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot (blockNumber: BN): void {
      // nothing, yet
    }
  };
}
