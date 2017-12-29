// ISC, Copyright 2017 Jaco Greeff
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
