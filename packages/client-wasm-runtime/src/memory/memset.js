// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

module.exports = function memset (heap: RuntimeEnv$Heap, dst: PointerType, val: number, num: number): PointerType {
  heap.uint8.fill(val, dst, num);

  return dst;
};
