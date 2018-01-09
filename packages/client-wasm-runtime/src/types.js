// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
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

  get: (ptr: PointerType, length: number) => Uint8Array,
  set: (ptr: PointerType, data: Uint8Array) => void
};

export type RuntimeEnv = {
  heap: RuntimeEnv$Heap,
  l: Logger,
  storage: DbInterface
};

export type RuntimeInterface$Io = {
  print: (ptr: PointerType, length: number) => void,
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
  set_storage: (keyPtr: PointerType, keyLength: number, dataPtr: PointerType, dataLength: number) => void
}

export type RuntimeInterface = {
  io: RuntimeInterface$Io,
  memory: RuntimeInterface$Memory,
  storage: RuntimeInterface$Storage
};
