// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/// <reference types="webassembly-js-api"/>

import { RuntimeInterface } from '@polkadot/client-runtime/types';

import runtimeProxy from '../wasm/proxy_runtime.wasm.js';
import createExports from './exports';

export default function createEnv (runtime: RuntimeInterface, memory: WebAssembly.Memory): WebAssemblyInstance$Exports {
  const proxy = createExports(runtimeProxy, { runtime: runtime.exports }, memory);

  return Object.keys(runtime.exports).reduce((result, name) => {
    const extName = `ext_${name}`;

    result[extName] = proxy[extName];

    return result;
  }, ({}: $Shape<WebAssemblyInstance$Exports>));
}
