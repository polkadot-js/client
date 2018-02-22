// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType, RuntimeEnv, RuntimeInterface$Memory } from '../types';

const memcpy = require('./memcpy');
const memcmp = require('./memcmp');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ l, heap }: RuntimeEnv): RuntimeInterface$Memory {
  return {
    free: (ptr: PointerType): void => {
      l.debug('free', [ptr], '->', heap.deallocate(ptr));
    },
    malloc: (size: number): PointerType => {
      const ptr = heap.allocate(size);

      l.debug('malloc', [size], '->', ptr);

      return ptr;
    },
    memcpy: (dst: PointerType, src: PointerType, num: number): PointerType => {
      l.debug('memcpy', [dst, src, num]);

      return memcpy(heap, dst, src, num);
    },
    memcmp: (s1: PointerType, s2: PointerType, length: number): number => {
      l.debug('memcmp', [s1, s2, length]);

      return memcmp(heap, s1, s2, length);
    },
    memmove: (dst: PointerType, src: PointerType, num: number): PointerType => {
      l.debug('memmove', [dst, src, num]);

      return memmove(heap, dst, src, num);
    },
    memset: (dst: PointerType, val: number, num: number): PointerType => {
      l.debug('memset', [dst, val, num]);

      return memset(heap, dst, val, num);
    }
  };
};
