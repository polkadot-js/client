// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
/* eslint camelcase: 0 */

const l = require('@polkadot/util/logger')('test');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aFromString = require('@polkadot/util/u8a/fromString');

const envHeap = require('../environment/heap');
const index = require('./index');

describe('enumerated_trie_root', () => {
  let enumerated;
  let heap;

  beforeEach(() => {
    heap = envHeap({ buffer: new Uint8Array(64 * 1024) });

    enumerated = (arr) => {
      const totalLength = arr.reduce((total, item) => total + item.length, 0);
      const ptrLen = heap.allocate(arr.length * 4);
      const ptrVal = heap.allocate(totalLength);
      const ptrRes = heap.allocate(32);
      let offset = 0;

      arr.forEach((item, index) => {
        heap.set(ptrVal + offset, item);
        heap.setU32(ptrLen + (index * 4), item.length);

        offset += item.length;
      });

      index({ l, heap }).enumerated_trie_root(ptrVal, ptrLen, arr.length, ptrRes);

      return heap.get(ptrRes, 32);
    };
  });

  it('calculates a basic ennumerated root', () => {
    expect(
      enumerated([
        u8aFromString('doe'),
        u8aFromString('reindeer')
      ])
    ).toEqual(
      hexToU8a(
        '0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3'
      )
    );
  });
});
