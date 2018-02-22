// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory } from './types';

module.exports = function setMemory ({ buffer }: WebAssembly.Memory, offset?: number = 256 * 1024): Memory {
  const uint8 = new Uint8Array(buffer);

  return {
    allocated: {},
    deallocated: {},
    offset, // aligned with Rust (should have offset)
    size: buffer.byteLength,
    uint8,
    view: new DataView(uint8.buffer)
  };
};
