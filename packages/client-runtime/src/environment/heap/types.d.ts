// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Pointer } from '../../types';

export type Memory$Buffer = {
  [index: number]: number // offset -> size
}

export type Memory = {
  allocated: Memory$Buffer,
  deallocated: Memory$Buffer,
  isResized: boolean,
  offset: number,
  size: number,
  uint8: Uint8Array,
  view: DataView
};

export type SizeUsed = {
  allocated: number,
  deallocated: number
};
