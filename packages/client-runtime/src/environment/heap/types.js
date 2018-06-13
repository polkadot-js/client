// Copyright 2017-2018 @polkadot/client-runtime authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Pointer } from '../../types';

export type Memory$Buffer = {
  [Pointer]: number // offset -> size
}

export type Memory = {
  allocated: Memory$Buffer,
  deallocated: Memory$Buffer,
  offset: number,
  size: number,
  uint8: Uint8Array,
  view: DataView
};

export type HeapState = {
  memory: Memory
};

export type SizeUsed = {
  allocated: number,
  deallocated: number
};
