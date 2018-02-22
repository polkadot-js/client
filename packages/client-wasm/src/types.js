// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

export type WasmExports = {
  // flowlint-next-line unclear-type:off
  env: Object
};

export type WasmConfigType = {
  heapSize: number
};

// flowlint-next-line unclear-type:off
export type WasmExtraImports = Object;

export type ExecutorInstance = {
  instance: WebAssemblyInstance$Exports,
  runtime: RuntimeInterface
};
