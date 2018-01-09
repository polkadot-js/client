// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RuntimeEnv, RuntimeInterface$Storage, PointerType } from '../types';

const set = require('./set');

module.exports = function storage ({ heap, storage }: RuntimeEnv): RuntimeInterface$Storage {
  return {
    set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number): void => set(storage, heap, keyPtr, keyLength, dataPtr, dataLength)
  };
};
