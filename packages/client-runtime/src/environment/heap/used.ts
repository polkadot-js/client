// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Memory, Memory$Buffer, SizeUsed } from './types';

function calculateSize (buffer: Memory$Buffer): number {
  return Object
    .values(buffer)
    .reduce((total, size) => total + (size as number), 0);
}

export default function used (memory: Memory): SizeUsed {
  return {
    allocated: calculateSize(memory.allocated),
    deallocated: calculateSize(memory.deallocated)
  };
}
