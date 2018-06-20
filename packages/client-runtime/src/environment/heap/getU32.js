// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer } from '../../types';
import type { Memory } from './types';

export default function getU32 (memory: Memory, ptr: Pointer): number {
  return memory.view.getUint32(ptr, true);
}
