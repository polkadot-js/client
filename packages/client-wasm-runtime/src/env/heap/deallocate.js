// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType } from '../../types';
import type { Memory } from './types';

const ExtError = require('@polkadot/util/ext/error');
const isUndefined = require('@polkadot/util/is/undefined');

module.exports = function deallocate (memory: Memory, ptr: PointerType): void {
  const size = memory.allocated[ptr];

  if (isUndefined(size)) {
    throw new ExtError('Calling free() on unallocated memory');
  }

  delete memory.allocated[ptr];

  memory.deallocated[ptr] = size;
};
