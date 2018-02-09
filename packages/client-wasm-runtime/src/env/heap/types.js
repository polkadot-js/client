// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PointerType } from '../../types';

export type Memory$Buffer = {
  [PointerType]: number // offset -> size
}

export type Memory = {
  allocated: Memory$Buffer,
  freed: Memory$Buffer,
  offset: number,
  size: number,
  uint8: Uint8Array
};
