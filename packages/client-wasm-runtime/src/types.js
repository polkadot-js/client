// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

export type HeapType$Alloc = {
  [number]: number // offset -> size
}

export type HeapType = {
  alloc: HeapType$Alloc,
  freed: HeapType$Alloc,
  offset: number,
  size: number,
  uint8: Uint8Array
};

export type RuntimeType = {
  heap: HeapType
};

export type PointerType = number;

export type RuntimeInterface$Memory = {
  free: (ptr: PointerType) => void,
  malloc: (size: number) => PointerType,
  memcpy: (dst: PointerType, src: PointerType, num: number) => PointerType,
  memmove: (dst: PointerType, src: PointerType, num: number) => PointerType,
  memset: (dst: PointerType, val: number, num: number) => PointerType
};

export type RuntimeInterface = {
  memory: RuntimeInterface$Memory
};
