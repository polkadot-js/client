// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

const { HEAP_SIZE_MB } = require('../defaults');

const PAGE_SIZE_K = 64 * 1024;
const MB = 1024 * 1024;
const PAGE_PER_MB = MB / PAGE_SIZE_K;

module.exports = function createMemory (initial: number = HEAP_SIZE_MB, maximum: number = HEAP_SIZE_MB): WebAssembly.Memory {
  assert(initial <= maximum, 'Expected initial size to be <= maximum');

  return new WebAssembly.Memory({
    initial: (initial * PAGE_PER_MB),
    maximum: (maximum * PAGE_PER_MB)
  });
};
