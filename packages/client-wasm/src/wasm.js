// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { WasmExtraImports, WasmStateInstances } from './types';

const createRuntime = require('@polkadot/client-wasm-runtime');

const createImports = require('./create/imports');
const createInstance = require('./create/instance');
const createMemory = require('./create/memory');
const createModule = require('./create/module');
const createTable = require('./create/table');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block', 'run_tests'
];

module.exports = function wasm ({ wasm: { memoryInitial, memoryMaximum } }: ConfigType, { chain, db }: WasmStateInstances, bytecode: Uint8Array, imports?: WasmExtraImports = {}): WebAssemblyInstance$Exports {
  const memory = createMemory(memoryInitial, memoryMaximum);
  const table = createTable();
  const runtime = createRuntime(memory, chain, db);
  const instance = createInstance(
    createModule(bytecode),
    createImports(memory, table, runtime, imports)
  );

  return Object.keys(instance.exports).reduce((result, name) => {
    result[name] = !OVERLAYS.includes(name)
      ? instance.exports[name]
      : (data: Uint8Array) =>
        instance.exports[name](
          runtime.env.heap.set(
            runtime.env.heap.allocate(data.length),
            data
          ),
          data.length
        );

    return result;
  }, {});
};
