// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { DbInterface } from '@polkadot/client-db/types';

export type WasmExports = {
  // flowlint-next-line unclear-type:off
  env: Object
};

export type WasmConfigType = {
  memoryInitial: number,
  memoryMaximum: number
};

// flowlint-next-line unclear-type:off
export type WasmExtraImports = Object;

export type WasmStateInstances = {
  chain: ChainConfigType,
  db: DbInterface
};
