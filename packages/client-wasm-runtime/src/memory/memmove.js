// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

module.exports = function memmove (heap: RuntimeEnv$Heap, dst: PointerType, src: PointerType, num: number): PointerType {
  heap.set(
    dst,
    heap.dup(src, num)
  );

  return dst;
};
