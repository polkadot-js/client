// Copyright 2017-2018 @polkadot/client-wasm authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WasmExtraImports } from '../types';

type ModuleCache = {
  [Uint8Array]: WebAssemblyModule
}

const blake2AsU8a = require('@polkadot/util-crypto/blake2/asU8a');

const createImports = require('./imports');

const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

const moduleCache: ModuleCache = {};

module.exports = function exports (bytecode: Uint8Array, imports?: WasmExtraImports, memory: ?WebAssembly.Memory): WebAssemblyInstance$Exports {
  const codeHash = blake2AsU8a(bytecode);

  // NOTE compilation is quite resource intensive, here we bypass the actual Uint8Array -> Module compilation when we already have this module bytecode in our cache
  if (!moduleCache[codeHash]) {
    moduleCache[codeHash] = new WebAssembly.Module(bytecode);
  }

  const table = new WebAssembly.Table(DEFAULT_TABLE);
  const instance = new WebAssembly.Instance(
    moduleCache[codeHash],
    createImports(memory, table, imports)
  );

  return instance.exports;
};
