// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

module.exports = function memset (heap: HeapType, dst: PointerType, val: number, num: number): PointerType {
  heap.uint8.fill(val, dst, num);

  return dst;
};
