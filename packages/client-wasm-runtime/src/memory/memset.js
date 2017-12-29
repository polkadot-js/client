// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

module.exports = function memset (heap: HeapType, dest: PointerType, value: number, num: number): PointerType {
  heap.uint8.fill(value, dest, num);

  return dest;
};
