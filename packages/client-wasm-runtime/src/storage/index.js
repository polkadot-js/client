// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage, PointerType } from '../types';

const enumerateRoot = require('./enumerateRoot');
const get = require('./get');
const root = require('./root');
const set = require('./set');

module.exports = function storage ({ heap, storage }: RuntimeEnv): RuntimeInterface$Storage {
  return {
    enumerated_trie_root: (valuesPtr: PointerType, lensPtr: PointerType, lensLen: number, resultPtr: PointerType): void => {
      const lenses = [];

      for (let index = 0; index < lensLen; index++) {
        lenses.push(
          heap.getLU32(lensPtr + (index * 4))
        );
      }

      let offset = 0;
      const values = lenses
        .map((value) => offset += value) // eslint-disable-line
        .map((offset, index) => heap.get(valuesPtr + offset, index));

      heap.set(
        resultPtr,
        enumerateRoot(storage, values)
      );
    },
    storage_root: (resultPtr: PointerType): void =>
      heap.set(
        resultPtr,
        root(storage)
      ),
    get_allocated_storage: (keyPtr: PointerType, keyLength: number, writtenPtr: PointerType): PointerType =>
      0,
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      const data = get(storage, heap.get(keyPtr, keyLength), dataLength);

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void =>
      set(storage, heap.get(keyPtr, keyLength), heap.get(dataPtr, dataLength))
  };
};
