// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer } from '../../types';
import type { Memory } from './types';

module.exports = function get (memory: Memory, ptr: Pointer, len: number): Uint8Array {
  return memory.uint8.subarray(ptr, ptr + len);
};
