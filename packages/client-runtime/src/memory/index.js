// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer, RuntimeEnv, RuntimeInterface$Memory } from '../types';

const memcpy = require('./memcpy');
const memcmp = require('./memcmp');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ heap }: RuntimeEnv): RuntimeInterface$Memory {
  return {
    free: (ptr: Pointer): void => {
      // l.debug(() => ['free', [ptr]]);

      heap.deallocate(ptr);
    },
    malloc: (size: number): Pointer => {
      const ptr = heap.allocate(size);

      // l.debug(() => ['malloc', [size], '->', ptr]);

      return ptr;
    },
    memcpy: (dst: Pointer, src: Pointer, num: number): Pointer => {
      // l.debug(() => ['memcpy', [dst, src, num]]);

      return memcpy(heap, dst, src, num);
    },
    memcmp: (s1: Pointer, s2: Pointer, length: number): number => {
      // l.debug(() => ['memcmp', [s1, s2, length]]);

      return memcmp(heap, s1, s2, length);
    },
    memmove: (dst: Pointer, src: Pointer, num: number): Pointer => {
      // l.debug(() => ['memmove', [dst, src, num]]);

      return memmove(heap, dst, src, num);
    },
    memset: (dst: Pointer, val: number, num: number): Pointer => {
      // l.debug(() => ['memset', [dst, val, num]]);

      return memset(heap, dst, val, num);
    }
  };
};
