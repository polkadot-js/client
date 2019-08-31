// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { WasmExtraImports, WasmInstanceExports } from '../types';

import { xxhashAsHex } from '@polkadot/util-crypto';

import createImports from './imports';

interface ExportResult {
  codeHash: string;
  exports: WasmInstanceExports;
  isNewHash: boolean;
}

const DEFAULT_TABLE: WebAssembly.TableDescriptor = {
  initial: 0,
  element: 'anyfunc'
};

const cache: Map<string, WebAssembly.Instance> = new Map();

export default async function createExports (bytecode: Uint8Array, imports?: WasmExtraImports, memory?: WebAssembly.Memory | null, forceCreate = false): Promise<ExportResult> {
  // FIXME This should be the full hash, however it takes 35-65ms - this is a danger area
  const codeHash = xxhashAsHex(bytecode.subarray(0, 2048));
  const lookup = `${codeHash}_${bytecode.length}`;
  let instance = cache.get(lookup);
  const isNewHash = !instance;

  // NOTE compilation is quite resource intensive, here we bypass the actual Uint8Array -> Module compilation when we already have this module bytecode in our cache
  if (!instance || forceCreate) {
    const table = new WebAssembly.Table(DEFAULT_TABLE);

    const wasm = await WebAssembly.instantiate(
      bytecode,
      createImports(memory, table, imports)
    );

    instance = wasm.instance;
    cache.set(lookup, instance);
  }

  return {
    codeHash,
    exports: instance.exports,
    isNewHash
  };
}
