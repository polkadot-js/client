// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';

const { HEAP_SIZE_KB } = require('./defaults');
const createEnv = require('./create/env');
const createExports = require('./create/exports');
const createMemory = require('./create/memory');

module.exports = function wasm ({ wasm: { heapSize = HEAP_SIZE_KB } }: Config, runtime: RuntimeInterface, chainCode: Uint8Array, chainProxy: Uint8Array): WebAssemblyInstance$Exports {
  const env = createEnv(runtime, createMemory(0, 0));
  const proxy = createExports(chainCode, { env });
  const instance = createExports(chainProxy, { proxy }, createMemory(0, 0));

  // flowlint-next-line unclear-type:off
  const memory = ((proxy.memory: any): WebAssembly.Memory);
  const offset = memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(memory, offset * 64 * 1024);

  return instance;
};
