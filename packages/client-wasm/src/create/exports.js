// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WasmExtraImports } from '../types';

const assert = require('@polkadot/util/assert');

const createImports = require('./imports');

const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

module.exports = function exports (bytecode: Uint8Array, _imports?: WasmExtraImports = {}, memory: ?WebAssembly.Memory): WebAssemblyInstance$Exports {
  assert(WebAssembly.validate(bytecode), 'Expected valid wasm bytecode');

  const module = new WebAssembly.Module(bytecode);
  const table = new WebAssembly.Table(DEFAULT_TABLE);
  const imports = createImports(memory, table, _imports);
  const instance = new WebAssembly.Instance(module, imports);

  return instance.exports;
};
