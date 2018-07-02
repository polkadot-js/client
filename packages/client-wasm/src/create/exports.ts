// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { WasmExtraImports, WasmInstanceExports } from '../types';

import blake2AsU8a from '@polkadot/util-crypto/blake2/asU8a';

import createImports from './imports';

type Cache = {
  [index: string]: WebAssembly.Instance
};

const DEFAULT_TABLE: WebAssembly.TableDescriptor = {
  initial: 0,
  element: 'anyfunc'
};

const cache: Cache = {};

export default function createExports (bytecode: Uint8Array, imports?: WasmExtraImports, memory?: WebAssembly.Memory | null, forceCreate: boolean = false): WasmInstanceExports {
  const codeHash = blake2AsU8a(bytecode.subarray(0, 2048), 0).toString();

  // NOTE compilation is quite resource intensive, here we bypass the actual Uint8Array -> Module compilation when we already have this module bytecode in our cache
  if (!cache[codeHash] || forceCreate) {
    const table = new WebAssembly.Table(DEFAULT_TABLE);

    cache[codeHash] = new WebAssembly.Instance(
      new WebAssembly.Module(bytecode),
      createImports(memory, table, imports)
    );
  }

  return cache[codeHash].exports;
}
