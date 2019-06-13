// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export type Memory = {
  allocated: Map<number, number>,
  deallocated: Map<number, number>,
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
