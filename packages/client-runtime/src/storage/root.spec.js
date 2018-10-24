// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import TrieDb from '@polkadot/trie-db';
import { hexToU8a, logger, stringToU8a } from '@polkadot/util';

import index from './index';

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
      hexToU8a(
        '0x8aad789dff2f538bca5d8ea56e8abe10f4c7ba3a5dea95fea4cd6e7c3a1168d3'
      )
    );
  });
});
