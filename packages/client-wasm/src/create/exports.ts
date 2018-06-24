// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { WasmExtraImports } from '../types';

import blake2AsU8a from '@polkadot/util-crypto/blake2/asU8a';

import createImports from './imports';

type ModuleCache = {
  [index: string]: WebAssembly.Module
}

const DEFAULT_TABLE: WebAssembly.TableDescriptor = {
  initial: 0,
  element: 'anyfunc'
};

const moduleCache: ModuleCache = {};

export default function createExports (bytecode: Uint8Array, imports?: WasmExtraImports, memory?: WebAssembly.Memory | null): WebAssemblyInstance$Exports {
  const codeHash = blake2AsU8a(bytecode).toString();

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
}
