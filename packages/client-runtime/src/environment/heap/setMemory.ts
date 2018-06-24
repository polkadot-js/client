// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { HeapState } from './types';

export default function setMemory (state: HeapState, { buffer }: WebAssembly.Memory, offset?: number = 256 * 1024): void {
  const uint8 = new Uint8Array(buffer);

  state.memory = {
    allocated: {},
    deallocated: {},
    offset, // aligned with Rust (should have offset)
    size: buffer.byteLength,
    uint8,
    view: new DataView(uint8.buffer)
  };
}
