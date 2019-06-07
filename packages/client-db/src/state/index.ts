// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { StateDb } from '../types';

// import MemoryDb from '@polkadot/db/Memory';
import TrieDb from '@polkadot/trie-db';
// import { u8aToHex } from '@polkadot/util';

export default function createState (db: TrieDb): StateDb {
  let _db: TrieDb = db;

  return {
    get db (): TrieDb {
      return _db;
    },

    getRoot (): Uint8Array {
      // console.error('getRoot', '\n\t', u8aToHex(_db.getRoot()));

      return _db.getRoot();
    },

    setRoot (root: Uint8Array): void {
      // console.error('setRoot', '\n\t', u8aToHex(root), '\n\t', u8aToHex(_db.getRoot()));

      _db.setRoot(root);
    },

    snapshot (): void {
      // const newDb = new TrieDb(new MemoryDb());
      // const oldDb = _db;

      // const keys = oldDb.snapshot(newDb);

      // console.log('snapshot', keys, '\n\t', u8aToHex(newDb.getRoot()));

      // _db.close();
      // _db = newDb;
    }
  };
}
