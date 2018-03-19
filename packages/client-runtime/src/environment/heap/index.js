// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, Pointer } from '../../types';
import type { HeapState, SizeUsed } from './types';

const allocate = require('./allocate');
const deallocate = require('./deallocate');
const set = require('./set');
const setMemory = require('./setMemory');
const setU32 = require('./setU32');
const used = require('./used');

module.exports = function envHeap (): RuntimeEnv$Heap {
  let state = ({}: $Shape<HeapState>);

  return {
    allocate: (size: number): Pointer =>
      allocate(state.memory, size),
    deallocate: (ptr: Pointer): number =>
      deallocate(state.memory, ptr),
    dup: (ptr: Pointer, len: number): Uint8Array =>
      state.memory.uint8.slice(ptr, ptr + len),
    fill: (ptr: Pointer, value: number, len: number): Uint8Array =>
      state.memory.uint8.fill(value, ptr, len),
    get: (ptr: Pointer, len: number): Uint8Array =>
      state.memory.uint8.subarray(ptr, ptr + len),
    getU32: (ptr: Pointer): number =>
      state.memory.view.getUint32(ptr, true),
    set: (ptr: Pointer, data: Uint8Array): Pointer =>
      set(state.memory, ptr, data),
    setU32: (ptr: Pointer, value: number): Pointer =>
      setU32(state.memory, ptr, value),
    setWasmMemory: (wasmMemory: WebAssembly.Memory, offset?: number): void =>
      setMemory(state, wasmMemory, offset),
    size: (): number =>
      state.memory.size,
    used: (): SizeUsed =>
      used(state.memory)
  };
};
