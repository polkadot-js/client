// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');

const PAGE_SIZE = 64 * 1024;
const HEAP_DEFAULT_BYTES = 8 * 1024 * 1024;

module.exports = function createMemory (initial: number = HEAP_DEFAULT_BYTES, maximum: number = HEAP_DEFAULT_BYTES): WebAssembly.Memory {
  assert(initial <= maximum, 'Expected initial size to be <= maximum');
  assert(initial % PAGE_SIZE === 0, 'Expected intial to be multiple of 64k');
  assert(maximum % PAGE_SIZE === 0, 'Expected maximum to be multiple of 64k');

  return new WebAssembly.Memory({
    initial: initial / PAGE_SIZE,
    maximum: maximum / PAGE_SIZE
  });
};
