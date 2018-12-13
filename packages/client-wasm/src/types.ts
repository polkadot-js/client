// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { BlockData } from '@polkadot/client-types/index';

export type WasmInstanceExports = {
  [index: string]: any
};

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

export type ExecutorInterface = {
  importBlock (block: BlockData): boolean;
};
