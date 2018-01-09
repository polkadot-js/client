// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

// 1. find all free blocks that can contain the current requested amount
// 2. sort by smallest -> largest
// 3. return the smallest slot
function findContaining ({ freed }: HeapType, size: number): PointerType {
  const [ptr] = Object
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

  if (ptr) {
    return parseInt(ptr, 10);
  }

  return -1;
}

module.exports = function freealloc (heap: HeapType, size: number): PointerType {
  const ptr = findContaining(heap, size);

  if (ptr === -1) {
    console.warn(`malloc(${size}) failed, consider increasing the default runtime memory size`);
    return 0;
  }

  // FIXME: We are being wasteful here, i.e. we should just un-free the requested size instead of everything, which leads to long-term fragmenbtation and loss
  delete heap.freed[ptr];
  heap.alloc[ptr] = size;

  return ptr;
};
