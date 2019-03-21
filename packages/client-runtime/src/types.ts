// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/// <reference types="webassembly-js-api"/>

import { TrieDb } from '@polkadot/trie-db/types';
import { Logger } from '@polkadot/util/types';
import { SizeUsed } from './environment/heap/types';

export type Pointer = number;
export type RuntimeStats = {
  [index: string]: {
    average?: number,
    calls: number,
    elapsed: number
  }
};

export type RuntimeInstrument = {
  start: () => void,
  stop: () => RuntimeStats
};

export interface RuntimeEnv$Heap {
  allocate: (size: number) => Pointer;
  deallocate: (ptr: Pointer) => number;
  dup: (ptr: Pointer, length: number) => Uint8Array;
  fill: (ptr: Pointer, value: number, len: number) => Uint8Array;
  get: (ptr: Pointer, length: number) => Uint8Array;
  getU32: (ptr: Pointer) => number;
  set: (ptr: Pointer, data: Uint8Array) => Pointer;
  setU32: (ptr: Pointer, value: number) => Pointer;
  setWasmMemory: (memory: WebAssembly.Memory, offset?: number) => void;
  size: () => number;
  used: () => SizeUsed;
  wasResized: () => boolean;
}

export type RuntimeEnv = {
  heap: RuntimeEnv$Heap,
  db: TrieDb,
  l: Logger
};

export type RuntimeInterface$Chain = {
  chain_id: () => number
};

export type RuntimeInterface$Crypto = {
  blake2_256: (data: Pointer, len: number, out: Pointer) => void,
  ed25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer) => number,
  keccak_256: (data: Pointer, len: number, out: Pointer) => void,
  secp256k1_ecdsa_recover: (msgPtr: Pointer, sigPtr: Pointer, pubkeyPtr: Pointer) => number,
  sr25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer) => number,
  twox_128: (data: Pointer, len: number, out: Pointer) => void,
  twox_256: (data: Pointer, len: number, out: Pointer) => void
};

export type RuntimeInterface$Io = {
  print_hex: (ptr: Pointer, len: number) => void,
  print_utf8: (ptr: Pointer, len: number) => void,
  print_num: (hi: number, lo: number) => void
};

export type RuntimeInterface$Memory = {
  free: (ptr: Pointer) => void,
  malloc: (size: number) => Pointer,
  memcmp: (s1: Pointer, s2: Pointer, length: number) => number,
  memcpy: (dst: Pointer, src: Pointer, num: number) => Pointer,
  memmove: (dst: Pointer, src: Pointer, num: number) => Pointer,
  memset: (dst: Pointer, val: number, num: number) => Pointer
};

export type RuntimeInterface$Sandbox = {
  sandbox_instantiate: (a: number, b: number, c: number, d: number, e: number, f: number) => number,
  sandbox_instance_teardown: (instanceIdx: number) => void,
  sandbox_invoke: (instanceIdx: number, exportPtr: Pointer, exportLen: number, argsPtr: Pointer, argsLen: number, returnValPtr: Pointer, returnValLen: number, state: number) => number,
  sandbox_memory_get: (memoryIdx: number, offset: number, ptr: Pointer, len: number) => number,
  sandbox_memory_new: (initial: number, maximum: number) => number,
  sandbox_memory_set: (memoryIdx: number, offset: number, ptr: Pointer, len: number) => number,
  sandbox_memory_teardown: (memoryIdx: number) => void
};

export type RuntimeInterface$Storage$Data = {
  clear_prefix: (prefixPtr: Pointer, prefixLength: number) => void,
  clear_storage: (keyPtr: Pointer, keyLength: number) => void,
  exists_storage: (keyPtr: Pointer, keyLength: number) => number,
  get_allocated_storage: (keyPtr: Pointer, keyLength: number, writtenPtr: Pointer) => Pointer,
  get_storage_into: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number, offset: number) => number,
  set_storage: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number) => void
};

export type RuntimeInterface$Storage$Trie = {
  blake2_256_enumerated_trie_root: (valuesPtr: Pointer, lensPtr: Pointer, lensLen: number, resultPtr: Pointer) => void,
  storage_changes_root: (parentHashData: Pointer, parentHashLen: number, parentNumHi: number, parentNumLo: number, result: Pointer) => number,
  storage_root: (resultPtr: Pointer) => void
};

export type RuntimeInterface$Storage = RuntimeInterface$Storage$Data & RuntimeInterface$Storage$Trie;

export type RuntimeInterface$Exports = RuntimeInterface$Chain & RuntimeInterface$Crypto & RuntimeInterface$Io & RuntimeInterface$Memory & RuntimeInterface$Sandbox & RuntimeInterface$Storage;

export type RuntimeInterface = {
  environment: RuntimeEnv,
  exports: RuntimeInterface$Exports,
  instrument: RuntimeInstrument
};
