// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const runtimeProxy = require('../wasm/proxy_runtime.wasm.js');
const createExports = require('./exports');

module.exports = function createEnv (runtime: RuntimeInterface, memory: WebAssembly.Memory): WebAssemblyInstance$Exports {
  const proxy = createExports(runtimeProxy, { runtime: runtime.exports }, memory);

  return Object.keys(runtime.exports).reduce((result, name) => {
    const extName = `ext_${name}`;

    result[extName] = proxy[extName];

    return result;
  }, ({}: $Shape<WebAssemblyInstance$Exports>));
};
