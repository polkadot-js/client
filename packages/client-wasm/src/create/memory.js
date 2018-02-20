// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

const { HEAP_SIZE_KB } = require('../defaults');

const PAGE_PER_KB = 16;

module.exports = function createMemory (initial: number = HEAP_SIZE_KB, maximum: number = HEAP_SIZE_KB): WebAssembly.Memory {
  assert(initial <= maximum, 'Expected initial size to be <= maximum');

  return new WebAssembly.Memory({
    initial: (initial / PAGE_PER_KB) || 8,
    maximum: (maximum / PAGE_PER_KB) || 8
  });
};
