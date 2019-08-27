// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { WasmInstanceExports } from '../types';

import runtimeProxy from '../wasm/proxy_runtime_wasm';
import createExports from './exports';

export default async function createEnv (runtime: RuntimeInterface, memory: WebAssembly.Memory): Promise<WasmInstanceExports> {
  const proxy = await createExports(runtimeProxy, { runtime: runtime.exports }, memory);

  return Object.keys(runtime.exports).reduce((result: WasmInstanceExports, name): WasmInstanceExports => {
    const extName = `ext_${name}`;

    result[extName] = proxy.exports[extName];

    return result;
  }, {});
}
