// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const index = require('./index');

describe('storage_root', () => {
  let heap;
  let storage;
  let storage_root;

  beforeEach(() => {
    heap = {
      set: jest.fn()
    };

    storage = {};

    storage_root = index({ heap, storage }).storage_root;
  });

  it('creates a basic storage root', () => {
    storage.pairs = () => ([
      { k: u8aFromString('doe'), v: u8aFromString('reindeer') },
      { k: u8aFromString('dog'), v: u8aFromString('puppy') },
      { k: u8aFromString('dogglesworth'), v: u8aFromString('cat') }
    ]);
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
