// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RuntimeEnv$Heap, PointerType } from '../types';

const ExtError = require('@polkadot/util/ext/error');
const isUndefined = require('@polkadot/util/is/undefined');

module.exports = function free (heap: RuntimeEnv$Heap, ptr: PointerType): void {
  const size = heap.alloc[ptr];

  if (isUndefined(size)) {
    throw new ExtError('Calling free() on unallocated memory');
  }

  delete heap.alloc[ptr];

  heap.freed[ptr] = size;
};
