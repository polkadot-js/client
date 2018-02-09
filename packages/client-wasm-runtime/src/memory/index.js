// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType, RuntimeEnv, RuntimeInterface$Memory } from '../types';

const memcpy = require('./memcpy');
const memcmp = require('./memcmp');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ heap }: RuntimeEnv): RuntimeInterface$Memory {
  return {
    free: (ptr: PointerType): void =>
      heap.deallocate(ptr),
    malloc: (size: number): PointerType =>
      heap.allocate(size),
    memcpy: (dst: PointerType, src: PointerType, num: number): PointerType =>
      memcpy(heap, dst, src, num),
    memcmp: (s1: PointerType, s2: PointerType, length: number): number =>
      memcmp(heap, s1, s2, length),
    memmove: (dst: PointerType, src: PointerType, num: number): PointerType =>
      memmove(heap, dst, src, num),
    memset: (dst: PointerType, val: number, num: number): PointerType =>
      memset(heap, dst, val, num)
  };
};
