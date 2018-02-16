// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../../types';
import type { Memory, Memory$Buffer } from './types';

const allocate = require('./allocate');
const deallocate = require('./deallocate');

function reduceSize (buffer: Memory$Buffer): number {
  return Object
    .values(buffer)
    // flowlint-next-line unclear-type:off
    .reduce((total, size) => total + ((size: any): number), 0);
}

module.exports = function envHeap ({ buffer }: WebAssembly.Memory): RuntimeEnv$Heap {
  const uint8 = new Uint8Array(buffer);
  const view = new DataView(uint8.buffer);
  const memory: Memory = {
    uint8,
    allocated: {},
    deallocated: {},
    end: 156 * 1024, // buffer.byteLength - 1,
    size: buffer.byteLength
  };

  return {
    allocate: (size: number): PointerType =>
      allocate(memory, size),
    deallocate: (ptr: PointerType): void =>
      deallocate(memory, ptr),
    dup: (ptr: PointerType, len: number): Uint8Array =>
      uint8.slice(ptr, ptr + len),
    fill: (ptr: PointerType, value: number, len: number): Uint8Array =>
      uint8.fill(value, ptr, len),
    get: (ptr: PointerType, len: number): Uint8Array =>
      uint8.subarray(ptr, ptr + len),
    getU32: (ptr: PointerType): number =>
      view.getUint32(ptr, true),
    set: (ptr: PointerType, data: Uint8Array): PointerType => {
      uint8.set(data, ptr);

      return ptr;
    },
    setU32: (ptr: PointerType, value: number): PointerType => {
      view.setUint32(ptr, value, true);

      return ptr;
    },
    size: (): number =>
      memory.size,
    sizeAllocated: (): number =>
      reduceSize(memory.allocated),
    sizeDeallocated: (): number =>
      reduceSize(memory.deallocated)
  };
};
