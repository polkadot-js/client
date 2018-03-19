// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer } from '../../types';
import type { Memory } from './types';

module.exports = function set (memory: Memory, ptr: Pointer, data: Uint8Array): Pointer {
  memory.uint8.set(data, ptr);

  return ptr;
};
