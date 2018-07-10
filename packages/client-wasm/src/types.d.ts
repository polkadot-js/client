// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { ChainGenesis } from '@polkadot/client-chains/types';
import { BlockDb, StateDb } from '@polkadot/client-db-chain/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { UncheckedRaw } from '@polkadot/primitives/extrinsic';
import { Logger } from '@polkadot/util/types';

export type WasmInstanceExports = {
  [index: string]: any
}

export type WasmExports = {
  env: Object
};

export type WasmConfig = {
  heapSize: number
};

export type WasmExtraImports = {
  [index: string]: any
};

export type ExecutorInstance = {
  instance: WasmInstanceExports,
  runtime: RuntimeInterface
};

export type Executor$BlockImportResult = {
  body: Uint8Array,
  extrinsics: Array<UncheckedRaw>,
  headerHash: Uint8Array,
  header: Uint8Array
};

export type ExecutorInterface = {
  applyExtrinsic (extrinsic: UncheckedRaw): boolean,
  executeBlock (block: Uint8Array): boolean,
  finaliseBlock (header: Uint8Array): Uint8Array,
  generateBlock (extrinsics: Array<UncheckedRaw>, timestamp?: number): Uint8Array,
  importBlock (block: Uint8Array): Executor$BlockImportResult,
  initialiseBlock (header: Uint8Array): boolean
};

export type ExecutorState = {
  blockDb: BlockDb,
  config: Config,
  l: Logger,
  runtime: RuntimeInterface,
  stateDb: StateDb
};
