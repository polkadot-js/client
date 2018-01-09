// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

const freealloc = require('./freealloc');

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

  return freealloc(heap, size);
};
