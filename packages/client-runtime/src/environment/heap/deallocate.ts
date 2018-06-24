// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Pointer } from '../../types';
import { Memory } from './types';

import ExtError from '@polkadot/util/ext/error';
import isUndefined from '@polkadot/util/is/undefined';

export default function deallocate (memory: Memory, ptr: Pointer): number {
  const size = memory.allocated[ptr];

  if (isUndefined(size)) {
    throw new ExtError('Calling free() on unallocated memory');
  }

  delete memory.allocated[ptr];

  memory.deallocated[ptr] = size;
  // memory.uint8.fill(0, ptr, size);

  return size;
}
