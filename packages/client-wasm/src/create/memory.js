// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

const { HEAP_SIZE_MB } = require('../defaults');

const PAGE_SIZE_K = 64;
const BYTES_PER_K = 1024;

module.exports = function createMemory (initial: number = HEAP_SIZE_MB, maximum: number = HEAP_SIZE_MB): WebAssembly.Memory {
  assert(initial <= maximum, 'Expected initial size to be <= maximum');

  return new WebAssembly.Memory({
    initial: (initial * BYTES_PER_K) / PAGE_SIZE_K,
    maximum: (maximum * BYTES_PER_K) / PAGE_SIZE_K
  });
};
