// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory, Memory$Buffer, SizeUsed } from './types';

function calculateSize (buffer: Memory$Buffer): number {
  return Object
    .values(buffer)
    // flowlint-next-line unclear-type:off
    .reduce((total, size) => total + ((size: any): number), 0);
}

module.exports = function used (memory: Memory): SizeUsed {
  return {
    allocated: calculateSize(memory.allocated),
    deallocated: calculateSize(memory.deallocated)
  };
};
