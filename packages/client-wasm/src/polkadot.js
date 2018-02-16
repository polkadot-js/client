// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { WasmStateInstances } from './types';

const createRuntime = require('@polkadot/client-wasm-runtime');
const proxyPolkadot = require('@polkadot/client-wasm-runtime/wasm/proxy_polkadot_wasm');
const proxyRuntime = require('@polkadot/client-wasm-runtime/wasm/proxy_runtime_wasm');

const createExports = require('./create/exports');
const createFn = require('./create/fn');
const createMemory = require('./create/memory');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function polkadotWasm ({ wasm: { memoryInitial, memoryMaximum } }: ConfigType, state: WasmStateInstances, polkadotCode: Uint8Array): WebAssemblyInstance$Exports {
  const memory = createMemory(memoryInitial, memoryMaximum);
  const runtime = createRuntime(memory, state);
  const env = createExports(null, proxyRuntime, { runtime: runtime.exports });
  const polkadot = createExports(memory, polkadotCode, { env });
  const executor = createExports(null, proxyPolkadot, { polkadot });

  return Object
    .keys(executor)
    .reduce((result, name) => {
      result[name] = !OVERLAYS.includes(name)
        ? executor[name]
        : createFn(executor, name, runtime);

      return result;
    }, {});
};
