// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { DbInterface } from '@polkadot/client-db/types';
import type { WasmExtraImports } from './types';

const createRuntime = require('@polkadot/client-wasm-runtime');

const { createImports, createInstance, createMemory, createModule, createTable } = require('./create');

module.exports = function wasm ({ wasm: { memoryInitial, memoryMaximum } }: ConfigType, db: DbInterface, bytecode: Uint8Array, imports?: WasmExtraImports = {}): WebAssemblyInstance$Exports {
  const memory = createMemory(memoryInitial, memoryMaximum);
  const table = createTable();
  const runtime = createRuntime(memory, db);

  return createInstance(
    createModule(bytecode),
    createImports(memory, table, runtime, imports)
  ).exports;
};
