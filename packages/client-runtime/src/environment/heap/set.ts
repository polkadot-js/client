// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Pointer } from '../../types';
import { Memory } from './types';

export default function set (memory: Memory, ptr: Pointer, data: Uint8Array): Pointer {
  memory.uint8.set(data, ptr);

  return ptr;
}
