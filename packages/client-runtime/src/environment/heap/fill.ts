// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Pointer } from '../../types';
import { Memory } from './types';

export default function fill (memory: Memory, ptr: Pointer, value: number, len: number): Uint8Array {
  return memory.uint8.fill(value, ptr, ptr + len);
}
