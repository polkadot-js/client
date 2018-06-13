// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer, RuntimeEnv, RuntimeInterface$Memory } from '../types';

const instrument = require('../instrument');
const memcpy = require('./memcpy');
const memcmp = require('./memcmp');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ heap }: RuntimeEnv): RuntimeInterface$Memory {
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
};
