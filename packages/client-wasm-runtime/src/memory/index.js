// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RuntimeType, PointerType } from '../types';

const free = require('./free');
const malloc = require('./malloc');
const memcpy = require('./memcpy');
const memmove = require('./memmove');
const memset = require('./memset');

module.exports = function memory ({ heap }: RuntimeType): { [string]: Function } {
  return {
    free: (ptr: PointerType): void => free(heap, ptr),
    malloc: (size: number): PointerType => malloc(heap, size),
    memcpy: (dst: PointerType, src: PointerType, num: number): PointerType => memcpy(heap, dst, src, num),
    memmove: (dst: PointerType, src: PointerType, num: number): PointerType => memmove(heap, dst, src, num),
    memset: (dst: PointerType, val: number, num: number): PointerType => memset(heap, dst, val, num)
  };
};
