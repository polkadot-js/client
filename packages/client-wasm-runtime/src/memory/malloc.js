// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { HeapType, HeapType$Alloc, PointerType } from '../types';

// 1. find all free blocks that can contain the current requested amount
// 2. sort by smallest -> largest
// 3. allocate in the smallest slot, clearing, storing and returning offset
function findContaining (freed: HeapType$Alloc, size: number): number {
  const [pointer] = Object
    .keys(freed)
    // flowlint-next-line unclear-type:off
    .filter((offset) => freed[((offset: any): number)] >= size)
    .sort((a, b) => {
      // flowlint-next-line unclear-type:off
      const sizeA = freed[((a: any): number)];
      // flowlint-next-line unclear-type:off
      const sizeB = freed[((b: any): number)];

      if (sizeA < sizeB) {
        return -1;
      } else if (sizeA > sizeB) {
        return 1;
      }

      return 0;
    });

  if (pointer) {
    return parseInt(pointer, 10);
  }

  return -1;
}

// TODO: We are being wasteful here, i.e. we should probably just un-free the requested size instead of everything, which leads to long-term "loss"
function realloc (heap: HeapType, ptr: number, size: number): PointerType {
  delete heap.freed[ptr];
  heap.alloc[ptr] = size;

  return ptr;
}

module.exports = function malloc (heap: HeapType, size: number): PointerType {
  if (size === 0) {
    return 0;
  }

  const ptr = heap.offset;
  const end = ptr + size;

  if (end <= heap.size) {
    heap.offset = end;
    heap.alloc[ptr] = size;

    return ptr;
  }

  const reclaimed = findContaining(heap.freed, size);

  if (reclaimed === -1) {
    console.warn(`malloc(${size}) failed, consider increasing the default runtime memory size`);
    return 0;
  }

  return realloc(heap, reclaimed, size);
};
