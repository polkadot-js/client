// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, Pointer } from '../../types';
import type { HeapState, SizeUsed } from './types';

import allocate from './allocate';
import deallocate from './deallocate';
import dup from './dup';
import fill from './fill';
import get from './get';
import getU32 from './getU32';
import set from './set';
import setMemory from './setMemory';
import setU32 from './setU32';
import used from './used';

export default function envHeap (): RuntimeEnv$Heap {
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
}
