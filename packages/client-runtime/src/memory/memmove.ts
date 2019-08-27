// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnvHeap, Pointer } from '../types';

export default function memmove (heap: RuntimeEnvHeap, dst: Pointer, src: Pointer, num: number): Pointer {
  heap.set(
    dst,
    heap.dup(src, num)
  );

  return dst;
}
