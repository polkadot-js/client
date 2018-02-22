// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

module.exports = function memset (heap: RuntimeEnv$Heap, dstPtr: PointerType, value: number, length: number): PointerType {
  heap.fill(dstPtr, value, length);

  return dstPtr;
};
