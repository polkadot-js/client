// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv, PointerType } from './types';

const l = require('@polkadot/util/logger')('runtime');

const STACK_SIZE = 32768;

module.exports = function createEnv ({ buffer }: WebAssembly.Memory, storage: DbInterface): RuntimeEnv {
  const uint8 = new Uint8Array(buffer);

  return {
    l,
    storage,
    heap: {
      uint8,
      alloc: {},
      freed: {},
      offset: STACK_SIZE,
      size: buffer.byteLength,
      dup: (ptr: PointerType, len: number): Uint8Array =>
        uint8.slice(ptr, ptr + len),
      get: (ptr: PointerType, len: number): Uint8Array =>
        uint8.subarray(ptr, ptr + len),
      set: (ptr: PointerType, data: Uint8Array): void =>
        uint8.set(data, ptr)
    }
  };
};
