// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
