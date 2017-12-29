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
    memcpy: (dest: PointerType, src: PointerType, num: number): PointerType => memcpy(heap, dest, src, num),
    memmove: (dest: PointerType, src: PointerType, num: number): PointerType => memmove(heap, dest, src, num),
    memset: (dest: PointerType, value: number, num: number): PointerType => memset(heap, dest, value, num)
  };
};
