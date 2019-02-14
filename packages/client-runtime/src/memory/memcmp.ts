// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv$Heap, Pointer } from '../types';

export default function memcmp (heap: RuntimeEnv$Heap, s1: Pointer, s2: Pointer, length: number): number {
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
}
