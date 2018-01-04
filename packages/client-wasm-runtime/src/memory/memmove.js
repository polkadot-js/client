// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

module.exports = function memmove (heap: HeapType, dst: PointerType, src: PointerType, num: number): PointerType {
  heap.uint8.set(
    heap.uint8.subarray(src, src + num),
    dst
  );

  return dst;
};
