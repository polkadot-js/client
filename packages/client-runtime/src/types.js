// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Logger } from '@polkadot/util/types';

export type Pointer = number;

export type RuntimeEnv$Heap = {
  allocate: (size: number) => Pointer,
  deallocate: (ptr: Pointer) => number,
  dup: (ptr: Pointer, length: number) => Uint8Array,
  fill: (ptr: Pointer, value: number, len: number) => Uint8Array,
  get: (ptr: Pointer, length: number) => Uint8Array,
  getU32: (ptr: Pointer) => number,
  set: (ptr: Pointer, data: Uint8Array) => Pointer,
  setU32: (ptr: Pointer, value: number) => Pointer,
  setWasmMemory: (memory: WebAssembly.Memory, offset?: number) => void,
  size: () => number,
  sizeAllocated: () => number,
  sizeDeallocated: () => number
};

export type RuntimeEnv = {
  chain: ChainConfig,
  heap: RuntimeEnv$Heap,
  l: Logger,
  db: BaseDbInterface
};

export type RuntimeInterface$Chain = {
  chain_id: () => number
}

export type RuntimeInterface$Crypto = {
  blake2_256: (data: Pointer, len: number, out: Pointer) => void,
  ed25519_verify: (msgPtr: Pointer, msgLen: number, sigPtr: Pointer, pubkeyPtr: Pointer) => number,
  twox_128: (data: Pointer, len: number, out: Pointer) => void,
  twox_256: (data: Pointer, len: number, out: Pointer) => void
}

export type RuntimeInterface$Io = {
  print_hex: (ptr: Pointer, len: number) => void,
  print_utf8: (ptr: Pointer, len: number) => void,
  print_num: (hi: number, lo: number) => void
}

export type RuntimeInterface$Memory = {
  free: (ptr: Pointer) => void,
  malloc: (size: number) => Pointer,
  memcpy: (dst: Pointer, src: Pointer, num: number) => Pointer,
  memmove: (dst: Pointer, src: Pointer, num: number) => Pointer,
  memset: (dst: Pointer, val: number, num: number) => Pointer
};

export type RuntimeInterface$Storage$Data = {
  clear_storage: (keyPtr: Pointer, keyLength: number) => void,
  get_allocated_storage: (keyPtr: Pointer, keyLength: number, writtenPtr: Pointer) => Pointer,
  get_storage_into: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number) => number,
  set_storage: (keyPtr: Pointer, keyLength: number, dataPtr: Pointer, dataLength: number) => void
}

export type RuntimeInterface$Storage$Trie = {
  enumerated_trie_root: (valuesPtr: Pointer, lensPtr: Pointer, lensLen: number, resultPtr: Pointer) => void,
  storage_root: (resultPtr: Pointer) => void
}

export type RuntimeInterface$Storage = RuntimeInterface$Storage$Data & RuntimeInterface$Storage$Trie;

export type RuntimeInterface$Exports = RuntimeInterface$Chain & RuntimeInterface$Crypto & RuntimeInterface$Io & RuntimeInterface$Memory & RuntimeInterface$Storage;

export type RuntimeInterface = {
  environment: RuntimeEnv,
  exports: RuntimeInterface$Exports
};
