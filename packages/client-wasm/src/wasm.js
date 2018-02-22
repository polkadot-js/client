// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ExecutorInstance, WasmStateInstances } from './types';

const createRuntime = require('@polkadot/client-runtime');
const runtimeCode = require('@polkadot/client-runtime/wasm/proxy_runtime_wasm');

const { HEAP_SIZE_KB } = require('./defaults');
const createExports = require('./create/exports');
const createMemory = require('./create/memory');

module.exports = function wasm ({ wasm: { heapSize = HEAP_SIZE_KB } }: ConfigType, state: WasmStateInstances, chainCode: Uint8Array, proxyCode: Uint8Array): ExecutorInstance {
  const runtime = createRuntime(state);
  const env = createExports(runtimeCode, { runtime: runtime.exports }, createMemory(0, 0));
  const instance = createExports(chainCode, { env });
  const executor = createExports(proxyCode, { proxy: instance }, createMemory(0, 0));

  // flowlint-next-line unclear-type:off
  const memory = ((executor.memory: any): WebAssembly.Memory);
  const offset = memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(memory, offset * 64 * 1024);

  return {
    exports: executor.exports,
    runtime
  };
};
