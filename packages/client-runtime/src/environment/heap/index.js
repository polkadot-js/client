// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, Pointer } from '../../types';
import type { HeapState, SizeUsed } from './types';

const allocate = require('./allocate');
const deallocate = require('./deallocate');
const dup = require('./dup');
const fill = require('./fill');
const get = require('./get');
const getU32 = require('./getU32');
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
      dup(state.memory, ptr, len),
    fill: (ptr: Pointer, value: number, len: number): Uint8Array =>
      fill(state.memory, ptr, value, len),
    get: (ptr: Pointer, len: number): Uint8Array =>
      get(state.memory, ptr, len),
    getU32: (ptr: Pointer): number =>
      getU32(state.memory, ptr),
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
