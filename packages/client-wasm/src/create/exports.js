// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WasmExtraImports } from '../types';

const createImports = require('./imports');
const createInstance = require('./instance');
const createModule = require('./module');
const createTable = require('./table');

module.exports = function exports (bytecode: Uint8Array, imports?: WasmExtraImports = {}, memory: ?WebAssembly.Memory): WebAssemblyInstance$Exports {
  const table = createTable();
  const instance = createInstance(
    createModule(bytecode),
    createImports(memory, table, imports)
  );

  console.log('instance', instance, instance.memory);

  return instance.exports;
};
