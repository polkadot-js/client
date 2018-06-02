// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const runtimeProxy = require('../wasm/proxy_runtime_wasm');

const createExports = require('./exports');

const PROXIED = [ 'chain_id', 'print_num' ];

module.exports = function createEnv (runtime: RuntimeInterface, memory: WebAssembly.Memory): WebAssemblyInstance$Exports {
  const proxy = createExports(runtimeProxy, { runtime: runtime.exports }, memory);

  // NOTE: Here we only export the methods that _require_ being proxied on the WASM interface. In practice (naive performance tests with 64 blocks), there is no difference - it seems WASM handles exporting imports directly without calling overhead
  return Object.keys(runtime.exports).reduce((result, name) => {
    const extName = `ext_${name}`;

    result[extName] = PROXIED.includes(name)
      ? proxy[extName]
      : runtime.exports[name];

    return result;
  }, {});
};
