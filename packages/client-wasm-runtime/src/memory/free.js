// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { HeapType, PointerType } from '../types';

const ExtError = require('@polkadot/util/ext/error');
const isUndefined = require('@polkadot/util/is/undefined');

module.exports = function free (heap: HeapType, ptr: PointerType): void {
  const size = heap.alloc[ptr];

  if (isUndefined(size)) {
    throw new ExtError('Calling free() on unallocated memory');
  }

  delete heap.alloc[ptr];

  heap.freed[ptr] = size;
};
