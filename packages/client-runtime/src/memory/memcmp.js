// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

module.exports = function memcmp (heap: RuntimeEnv$Heap, s1: PointerType, s2: PointerType, length: number): number {
  const v1 = heap.get(s1, length);
  const v2 = heap.get(s2, length);

  for (let index = 0; index < length; index++) {
    if (v1[index] > v2[index]) {
      return 1;
    } else if (v1[index] < v2[index]) {
      return -1;
    }
  }

  return 0;
};
