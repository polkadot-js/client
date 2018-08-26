// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import assert from '@polkadot/util/assert';

import defaults from '../defaults';

const PAGE_PER_KB = 1024 / 64;

export default function createMemory (initial: number = defaults.HEAP_SIZE_KB, maximum: number = defaults.HEAP_SIZE_KB): WebAssembly.Memory {
  assert(initial <= maximum, 'Expected initial size to be <= maximum');

  return new WebAssembly.Memory({
    initial: Math.ceil(initial / PAGE_PER_KB) || 8,
    maximum: Math.ceil(maximum / PAGE_PER_KB) || 8
  });
}
