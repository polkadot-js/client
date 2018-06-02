// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Config } from '@polkadot/client/types';
import type { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { Logger } from '@polkadot/util/types';

export type WasmExports = {
  // flowlint-next-line unclear-type:off
  env: Object
};

export type WasmConfig = {
  heapSize: number
};

// flowlint-next-line unclear-type:off
export type WasmExtraImports = Object;

export type ExecutorInstance = {
  instance: WebAssemblyInstance$Exports,
  runtime: RuntimeInterface
};

export type Executor$BlockImportResult = {
  body: Uint8Array,
  extrinsics: Array<Uint8Array>,
  hash: Uint8Array,
  header: Uint8Array
};

export type ExecutorInterface = {
  applyExtrinsic (header: Uint8Array, utx: Uint8Array): Uint8Array,
  executeBlock (block: Uint8Array): boolean,
  finaliseBlock (header: Uint8Array): Uint8Array,
  generateBlock (number: BN | number, extrinsics: Array<Uint8Array>): Uint8Array,
  importBlock (block: Uint8Array): ?Executor$BlockImportResult
};

export type ExecutorState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
