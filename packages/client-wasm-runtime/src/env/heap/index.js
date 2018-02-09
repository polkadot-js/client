// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../../types';
import type { Memory, Memory$Buffer } from './types';

const allocate = require('./allocate');
const deallocate = require('./deallocate');

const STACK_SIZE = 32768;

function reduceSize (buffer: Memory$Buffer): number {
  return Object.values(buffer).reduce((total, size) => total + size, 0);
}

module.exports = function envHeap ({ buffer }: WebAssembly.Memory): RuntimeEnv$Heap {
  const uint8 = new Uint8Array(buffer);
  const view = new DataView(uint8.buffer);
  const memory: Memory = {
    uint8,
    allocated: {},
    deallocated: {},
    offset: STACK_SIZE,
    size: buffer.byteLength
  };

  return {
    allocate: (size: number): PointerType =>
      allocate(memory, size),
    deallocate: (ptr: PointerType): void =>
      deallocate(memory, ptr),
    dup: (ptr: PointerType, len: number): Uint8Array =>
      uint8.slice(ptr, ptr + len),
    get: (ptr: PointerType, len: number): Uint8Array =>
      uint8.subarray(ptr, ptr + len),
    getU32: (ptr: PointerType): number =>
      view.getUint32(ptr, true),
    set: (ptr: PointerType, data: Uint8Array): void =>
      uint8.set(data, ptr),
    setU32: (ptr: PointerType, value: number): void =>
      view.setUint32(ptr, value, true),
    size: (): number =>
      memory.size,
    sizeAllocated: (): number =>
      reduceSize(memory.allocated),
    sizeDeallocated: (): number =>
      reduceSize(memory.deallocated)
  };
};
