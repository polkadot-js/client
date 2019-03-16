// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import TrieDb from '@polkadot/trie-db';
import { logger, stringToU8a } from '@polkadot/util';

import index from '.';

const l = logger('test');

describe('storage_root', () => {
  let heap;
  let db;
  let storage_root;

  beforeEach(() => {
    heap = {
      set: jest.fn()
    };

    db = new TrieDb();

    storage_root = index({ l, heap, db }).storage_root;
  });

  it('creates a basic storage root', () => {
    db.put(stringToU8a('doe'), stringToU8a('reindeer'));
    db.put(stringToU8a('dog'), stringToU8a('puppy'));
    db.put(stringToU8a('dogglesworth'), stringToU8a('cat'));

    storage_root(5);

    expect(
      heap.set
    ).toHaveBeenCalledWith(
      5,
      new Uint8Array([
        11, 65, 228, 136, 204, 203, 214, 125, 31, 16, 137, 89, 44, 44, 35, 95, 92, 83, 153, 176, 83, 247, 254, 145, 82, 221, 75, 95, 39, 153, 20, 205
      ])
    );
  });
});
