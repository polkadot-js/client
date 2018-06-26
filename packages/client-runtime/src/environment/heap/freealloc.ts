// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Pointer } from '../../types';
import { Memory } from './types';

// 1. find all free blocks that can contain the current requested amount
// 2. sort by smallest -> largest
// 3. return the smallest slot
function findContaining (memory: Memory, size: number): Pointer {
  const [ptr] = Object
    .keys(memory.deallocated)
    .filter((offset) =>
      memory.deallocated[offset as any] >= size
    )
    .sort((a: any, b: any) => {
      const sizeA = memory.deallocated[a];
      const sizeB = memory.deallocated[b];

      if (sizeA < sizeB) {
        return -1;
      } else if (sizeA > sizeB) {
        return 1;
      }

      return 0;
    });

  if (ptr) {
    return parseInt(ptr, 10);
  }

  return -1;
}

export default function freealloc (memory: Memory, size: number): Pointer {
  const ptr = findContaining(memory, size);

  if (ptr === -1) {
    console.warn(`allocate(${size}) failed, consider increasing the default runtime memory size`);
    return 0;
  }

  // FIXME: We are being wasteful here, i.e. we should just un-free the requested size instead of everything (long-term fragmentation and loss)
  delete memory.deallocated[ptr];
  memory.allocated[ptr] = size;

  return ptr;
}
