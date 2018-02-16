// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Logger } from '@polkadot/util/types';

export type PointerType = number;

export type RuntimeEnv$Heap = {
  allocate: (size: number) => PointerType,
  deallocate: (ptr: PointerType) => void,
  dup: (ptr: PointerType, length: number) => Uint8Array,
  fill: (ptr: PointerType, value: number, len: number) => Uint8Array,
  get: (ptr: PointerType, length: number) => Uint8Array,
  getU32: (ptr: PointerType) => number,
  set: (ptr: PointerType, data: Uint8Array) => PointerType,
  setU32: (ptr: PointerType, value: number) => PointerType,
  size: () => number,
  sizeAllocated: () => number,
  sizeDeallocated: () => number
};

export type RuntimeEnv = {
  chain: ChainConfigType,
  heap: RuntimeEnv$Heap,
  l: Logger,
  storage: BaseDbInterface
};

export type RuntimeInterface$Chain = {
  chain_id: () => number
}

export type RuntimeInterface$Crypto = {
  blake2_256: (data: PointerType, len: number, out: PointerType) => void,
  ed25519_verify: (msgPtr: PointerType, msgLen: number, sigPtr: PointerType, pubkeyPtr: PointerType) => number,
  twox_128: (data: PointerType, len: number, out: PointerType) => void,
  twox_256: (data: PointerType, len: number, out: PointerType) => void
}

export type RuntimeInterface$Io = {
  print_hex: (ptr: PointerType, len: number) => void,
  print_utf8: (ptr: PointerType, len: number) => void,
  print_num: (hi: number, lo: number) => void
}

export type RuntimeInterface$Memory = {
  free: (ptr: PointerType) => void,
  malloc: (size: number) => PointerType,
  memcpy: (dst: PointerType, src: PointerType, num: number) => PointerType,
  memmove: (dst: PointerType, src: PointerType, num: number) => PointerType,
  memset: (dst: PointerType, val: number, num: number) => PointerType
};

export type RuntimeInterface$Storage = {
  enumerated_trie_root: (valuesPtr: PointerType, lensPtr: PointerType, lensLen: number, resultPtr: PointerType) => void,
  storage_root: (resultPtr: PointerType) => void,
  get_allocated_storage: (keyPtr: PointerType, keyLength: number, writtenPtr: PointerType) => PointerType,
  get_storage_into: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number) => number,
  set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number) => void
}

export type RuntimeInterface$Exports = RuntimeInterface$Chain & RuntimeInterface$Crypto & RuntimeInterface$Io & RuntimeInterface$Memory & RuntimeInterface$Storage;

export type RuntimeInterface = {
  environment: RuntimeEnv,
  exports: RuntimeInterface$Exports
};
