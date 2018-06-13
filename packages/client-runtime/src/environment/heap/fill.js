// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer } from '../../types';
import type { Memory } from './types';

module.exports = function fill (memory: Memory, ptr: Pointer, value: number, len: number): Uint8Array {
  return memory.uint8.fill(value, ptr, ptr + len);
};
