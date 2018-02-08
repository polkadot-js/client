// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Logger } from '@polkadot/util/types';

export type PointerType = number;

export type RuntimeEnv$Heap$Alloc = {
  [PointerType]: number // offset -> size
}

export type RuntimeEnv$Heap = {
  alloc: RuntimeEnv$Heap$Alloc,
  freed: RuntimeEnv$Heap$Alloc,
  offset: number,
  size: number,
  uint8: Uint8Array,

  dup: (ptr: PointerType, length: number) => Uint8Array,
  get: (ptr: PointerType, length: number) => Uint8Array,
  getLU32: (ptr: PointerType) => number,
  set: (ptr: PointerType, data: Uint8Array) => void,
  setLU32: (ptr: PointerType, value: number) => void,
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
  print_num: (num: number) => void
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

export type RuntimeExports = {
  // flowlint-next-line unclear-type:off
  [string]: (any) => any
};
