// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import TrieDb from '@polkadot/trie-db';
import logger from '@polkadot/util/logger';
import hexToU8a from '@polkadot/util/hex/toU8a';
import u8aFromString from '@polkadot/util/u8a/fromString';

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
    db.put(u8aFromString('doe'), u8aFromString('reindeer'));
    db.put(u8aFromString('dog'), u8aFromString('puppy'));
    db.put(u8aFromString('dogglesworth'), u8aFromString('cat'));

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
