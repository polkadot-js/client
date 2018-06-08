// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { RuntimeInterface } from '@polkadot/client-runtime/types';
import type { Logger } from '@polkadot/util/types';

type Options = {
  config: Config,
  l: Logger
}

const { HEAP_SIZE_KB } = require('../defaults');
const createEnv = require('./env');
const createExports = require('./exports');
const createMemory = require('./memory');

function instrument <T> (name: string, elapsed: Array<string>, fn: () => T): T {
  const start = Date.now();
  const result = fn();

  elapsed.push(`${name}=${Date.now() - start}ms`);

  return result;
}

module.exports = function wasm ({ config: { wasm: { heapSize = HEAP_SIZE_KB } }, l }: Options, runtime: RuntimeInterface, chainCode: Uint8Array, chainProxy: Uint8Array): WebAssemblyInstance$Exports {
  const elapsed = [];
  const env = instrument('runtime', elapsed, (): WebAssemblyInstance$Exports =>
    createEnv(runtime, createMemory(0, 0))
  );
  const proxy = instrument('chain', elapsed, (): WebAssemblyInstance$Exports =>
    createExports(chainCode, { env })
  );
  const instance = instrument('proxy', elapsed, (): WebAssemblyInstance$Exports =>
    createExports(chainProxy, { proxy }, createMemory(0, 0))
  );

  const offset = proxy.memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(proxy.memory, offset * 64 * 1024);

  l.debug(() => `WASM created ${elapsed.join(', ')}`);

  return instance;
};
