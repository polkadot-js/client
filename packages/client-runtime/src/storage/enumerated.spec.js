// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { logger, stringToU8a } from '@polkadot/util';

import Heap from '../environment/heap';
import index from '.';

const l = logger('test');

describe('enumerated_trie_root', () => {
  let enumerated;
  let heap;

  beforeEach(() => {
    heap = new Heap();
    heap.setWasmMemory({ buffer: new Uint8Array(1024 * 1024) });

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

      index({ l, heap }).blake2_256_enumerated_trie_root(ptrVal, ptrLen, arr.length, ptrRes);

      return heap.get(ptrRes, 32);
    };
  });

  it('calculates a basic ennumerated root', () => {
    expect(
      enumerated([
        stringToU8a('doe'),
        stringToU8a('reindeer')
      ])
    ).toEqual(
      new Uint8Array([
        185, 177, 187, 7, 228, 129, 240, 57, 62, 21, 243, 47, 52, 171, 214, 101, 247, 166, 152, 120, 106, 126, 201, 254, 179, 27, 46, 137, 39, 173, 95, 134
      ])
    );
  });
});
