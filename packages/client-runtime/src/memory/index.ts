// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Pointer, RuntimeEnv, RuntimeInterface$Memory } from '../types';

import instrument from '../instrument';
import memcpy from './memcpy';
import memcmp from './memcmp';
import memmove from './memmove';
import memset from './memset';

export default function memory ({ heap }: RuntimeEnv): RuntimeInterface$Memory {
  return {
    free: (ptr: Pointer): void =>
      instrument('free', (): void => {
        // l.debug(() => ['free', [ptr]]);

        heap.deallocate(ptr);
      }),
    malloc: (size: number): Pointer =>
      instrument('malloc', (): Pointer => {
        const ptr = heap.allocate(size);

        // l.debug(() => ['malloc', [size], '->', ptr]);

        return ptr;
      }),
    memcpy: (dst: Pointer, src: Pointer, num: number): Pointer =>
      instrument('memcpy', (): Pointer => {
        // l.debug(() => ['memcpy', [dst, src, num]]);

        return memcpy(heap, dst, src, num);
      }),
    memcmp: (s1: Pointer, s2: Pointer, length: number): number =>
      instrument('memcmp', (): number => {
        // l.debug(() => ['memcmp', [s1, s2, length]]);

        return memcmp(heap, s1, s2, length);
      }),
    memmove: (dst: Pointer, src: Pointer, num: number): Pointer =>
      instrument('memmove', (): Pointer => {
        // l.debug(() => ['memmove', [dst, src, num]]);

        return memmove(heap, dst, src, num);
      }),
    memset: (dst: Pointer, val: number, num: number): Pointer =>
      instrument('memset', (): Pointer => {
        // l.debug(() => ['memset', [dst, val, num]]);

        return memset(heap, dst, val, num);
      })
  };
}
