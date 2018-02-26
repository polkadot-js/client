// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { ExecutorInstance } from './types';

const runtimeProxy = require('@polkadot/client-runtime/wasm/proxy_runtime_wasm');

const { HEAP_SIZE_KB } = require('./defaults');
const createExports = require('./create/exports');
const createMemory = require('./create/memory');

module.exports = function wasm ({ wasm: { heapSize = HEAP_SIZE_KB } }: ConfigType, runtime: RuntimeInterface, chainCode: Uint8Array, chainProxy: Uint8Array): ExecutorInstance {
  const env = createExports(runtimeProxy, { runtime: runtime.exports }, createMemory(0, 0));
  const proxy = createExports(chainCode, { env });
  const instance = createExports(chainProxy, { proxy }, createMemory(0, 0));

  // flowlint-next-line unclear-type:off
  const memory = ((proxy.memory: any): WebAssembly.Memory);
  const offset = memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(memory, offset * 64 * 1024);

  return instance;
};
