// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ExecutorInstance, WasmStateInstances } from './types';

const createRuntime = require('@polkadot/client-wasm-runtime');
const proxyPolkadot = require('@polkadot/client-wasm-runtime/wasm/proxy_polkadot_wasm');
const proxyRuntime = require('@polkadot/client-wasm-runtime/wasm/proxy_runtime_wasm');

const { HEAP_SIZE_KB } = require('./defaults');
const createExports = require('./create/exports');
const createFn = require('./create/fn');
const createMemory = require('./create/memory');

const OVERLAYS = [
  'execute_block', 'execute_transaction', 'finalise_block'
];

module.exports = function polkadotWasm ({ wasm: { heapSize = HEAP_SIZE_KB } }: ConfigType, state: WasmStateInstances, polkadotCode: Uint8Array): ExecutorInstance {
  const runtime = createRuntime(state);
  const env = createExports(proxyRuntime, { runtime: runtime.exports }, createMemory(0, 0));
  const polkadot = createExports(polkadotCode, { env });
  const executor = createExports(proxyPolkadot, { polkadot }, createMemory(0, 0));

  // flowlint-next-line unclear-type:off
  const memory = ((polkadot.memory: any): WebAssembly.Memory);
  const offset = memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(memory, offset * 64 * 1024);

  return Object
    .keys(executor)
    .reduce((result, name) => {
      result.exports[name] = !OVERLAYS.includes(name)
        ? executor[name]
        : createFn(executor, name, runtime);

      return result;
    }, { exports: {}, runtime });
};
