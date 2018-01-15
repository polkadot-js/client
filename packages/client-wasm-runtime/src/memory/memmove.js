// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

module.exports = function memmove (heap: RuntimeEnv$Heap, dst: PointerType, src: PointerType, num: number): PointerType {
  heap.set(
    dst,
    heap.get(src, num)
  );

  return dst;
};
