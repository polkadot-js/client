// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WasmExtraImports } from '../types';

type CompiledCache = {
  [Uint8Array]: WebAssemblyModule
}

const blake2AsU8a = require('@polkadot/util-crypto/blake2/asU8a');

const createImports = require('./imports');

const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

const moduleCache: CompiledCache = {};

module.exports = function exports (bytecode: Uint8Array, _imports?: WasmExtraImports = {}, memory: ?WebAssembly.Memory): WebAssemblyInstance$Exports {
  const codeHash = blake2AsU8a(bytecode);

  if (!moduleCache[codeHash]) {
    moduleCache[codeHash] = new WebAssembly.Module(bytecode);
  }

  const module = moduleCache[codeHash];
  const table = new WebAssembly.Table(DEFAULT_TABLE);
  const imports = createImports(memory, table, _imports);
  const instance = new WebAssembly.Instance(module, imports);

  return instance.exports;
};
