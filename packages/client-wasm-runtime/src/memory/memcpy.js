// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

module.exports = function memcpy (heap: HeapType, dest: PointerType, src: PointerType, num: number): PointerType {
  heap.uint8.set(
    heap.uint8.subarray(src, src + num),
    dest
  );

  return dest;
};
