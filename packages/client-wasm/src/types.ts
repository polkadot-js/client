// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { BlockData } from '@polkadot/client-types';

export type WasmInstanceExports = Record<string, any>;

export interface WasmExports {
  env: Record<string, any>;
}

export interface WasmConfig {
  heapSize: number;
}

export type WasmExtraImports = Record<string, any>;

export interface ExecutorInstance {
  instance: WasmInstanceExports;
  runtime: RuntimeInterface;
}

export interface ExecutorInterface {
  importBlock (block: BlockData): Promise<boolean>;
  importHeader (block: BlockData): Promise<boolean>;
}
