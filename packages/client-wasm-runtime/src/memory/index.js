// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType, RuntimeEnv, RuntimeInterface$Memory } from '../types';

const free = require('./free');
const malloc = require('./malloc');
const memcpy = require('./memcpy');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ heap }: RuntimeEnv): RuntimeInterface$Memory {
  return {
    free: (ptr: PointerType): void =>
      free(heap, ptr),
    malloc: (size: number): PointerType =>
      malloc(heap, size),
    memcpy: (dst: PointerType, src: PointerType, num: number): PointerType =>
      memcpy(heap, dst, src, num),
    memmove: (dst: PointerType, src: PointerType, num: number): PointerType =>
      memmove(heap, dst, src, num),
    memset: (dst: PointerType, val: number, num: number): PointerType =>
      memset(heap, dst, val, num)
  };
};
