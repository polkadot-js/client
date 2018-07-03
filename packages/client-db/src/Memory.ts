// Copyright 2017-2018 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from './types';

import memdown from 'memdown';
import Trie from '@polkadot/trie-db/index';
import syncify from '@polkadot/util/syncify';

export default class MemoryDb implements TrieDb {
  trie: Trie;

  constructor (root?: Uint8Array) {
    this.trie = new Trie(memdown(), root);
  }

  checkpoint (): void {
    return syncify(
      this.trie.checkpoint()
    );
  }

  commit (): void {
    syncify(
      this.trie.commit()
    );
  }

  del (key: Uint8Array): void {
    syncify(
      this.trie.del(key)
    );
  }

  get (key: Uint8Array): Uint8Array | null {
    return syncify(
      this.trie.get(key)
    );
  }

  revert (): void {
    return syncify(
      this.trie.revert()
    );
  }

  put (key: Uint8Array, value: Uint8Array): void {
    return syncify(
      this.trie.put(key, value)
    );
  }

  trieRoot (): Uint8Array {
    return this.trie.root;
  }
}
