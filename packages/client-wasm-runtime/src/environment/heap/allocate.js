// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType } from '../../types';
import type { Memory } from './types';

const freealloc = require('./freealloc');

module.exports = function allocate (memory: Memory, size: number): PointerType {
  if (size === 0) {
    return 0;
  }

  // grow up
  const ptr = memory.offset;
  const offset = ptr + size;

  if (offset < memory.size) {
    memory.offset = offset; // grow up
    memory.allocated[ptr] = size;

    return ptr;
  }

  return freealloc(memory, size);
};
