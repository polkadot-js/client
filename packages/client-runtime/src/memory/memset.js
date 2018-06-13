// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, Pointer } from '../types';

module.exports = function memset (heap: RuntimeEnv$Heap, dstPtr: Pointer, value: number, length: number): Pointer {
  heap.fill(dstPtr, value, length);

  return dstPtr;
};
