// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

const freealloc = require('./freealloc');

module.exports = function malloc (heap: RuntimeEnv$Heap, size: number): PointerType {
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
