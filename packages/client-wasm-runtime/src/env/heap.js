// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

const STACK_SIZE = 32768;

module.exports = function envHeap ({ buffer }: WebAssembly.Memory): RuntimeEnv$Heap {
  const uint8 = new Uint8Array(buffer);

  return {
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
  };
};
