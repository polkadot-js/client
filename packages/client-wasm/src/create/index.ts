// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { RuntimeInterface } from '@polkadot/client-runtime/types';
import { Logger } from '@polkadot/util/types';
import { WasmInstanceExports } from '../types';

import defaults from '../defaults';
import createEnv from './env';
import createExports from './exports';
import createMemory from './memory';

type Options = {
  config: Config,
  l: Logger
}

function instrument <T> (name: string, elapsed: Array<string>, fn: () => T): T {
  const start = Date.now();
  const result = fn();

  elapsed.push(`${name}=${Date.now() - start}ms`);

  return result;
}

export default function wasm ({ config: { wasm: { heapSize = defaults.HEAP_SIZE_KB } }, l }: Options, runtime: RuntimeInterface, chainCode: Uint8Array, chainProxy: Uint8Array): WasmInstanceExports {
  const elapsed: string[] = [];
  const env = instrument('runtime', elapsed, (): WasmInstanceExports =>
    createEnv(runtime, createMemory(0, 0))
  );
  const proxy = instrument('chain', elapsed, (): WasmInstanceExports =>
    createExports(chainCode, { env })
  );
  const instance = instrument('proxy', elapsed, (): WasmInstanceExports =>
    createExports(chainProxy, { proxy }, createMemory(0, 0))
  );

  const offset = proxy.memory.grow(Math.ceil(heapSize / 64));

  runtime.environment.heap.setWasmMemory(proxy.memory, offset * 64 * 1024);

  l.debug(() => `WASM created ${elapsed.join(', ')}`);

  return instance;
}
