// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage, PointerType } from '../types';

const get = require('./get');
const set = require('./set');

module.exports = function storage ({ heap, storage }: RuntimeEnv): RuntimeInterface$Storage {
  return {
    get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): number => {
      const data = get(storage, heap.get(keyPtr, keyLength), dataLength);

      heap.set(dataPtr, data);

      return data.length;
    },
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void =>
      set(storage, heap.get(keyPtr, keyLength), heap.get(dataPtr, dataLength))
  };
};
