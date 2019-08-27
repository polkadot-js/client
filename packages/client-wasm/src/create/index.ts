// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
};

function instrument <T> (name: string, elapsed: string[], fn: () => T): T {
  const start = Date.now();
  const result = fn();

  elapsed.push(`${name}=${Date.now() - start}ms`);

  return result;
}

let prevChain: WasmInstanceExports;
let pageOffset: number = 0;

export default async function wasm ({ config: { wasm: { heapSize = defaults.HEAP_SIZE_KB } }, l }: Options, runtime: RuntimeInterface, chainCode: Uint8Array, chainProxy: Uint8Array, forceNew: boolean = false): Promise<WasmInstanceExports> {
  const elapsed: string[] = [];
  const isResized = runtime.environment.heap.wasResized();
  const env = await instrument('runtime', elapsed, (): Promise<WasmInstanceExports> =>
    createEnv(runtime, createMemory(0, 0))
  );
  const chain = await instrument('chain', elapsed, async (): Promise<WasmInstanceExports> => {
    const instance = await createExports(chainCode, { env }, null, forceNew || isResized);

    if (instance.isNewHash) {
      l.warn(`Using new on-chain WASM code, header ${instance.codeHash}`);
    }

    return instance.exports;
  });
  const isNewCode = chain !== prevChain;

  if (forceNew || isNewCode) {
    prevChain = chain;
    pageOffset = chain.memory.grow(1 + Math.ceil(heapSize / 64));
  }

  const instance = await instrument('proxy', elapsed, async (): Promise<WasmInstanceExports> => {
    const instance = await createExports(chainProxy, { proxy: chain }, createMemory(0, 0), forceNew || isNewCode);

    return instance.exports;
  });

  runtime.environment.heap.setWasmMemory(chain.memory, pageOffset);

  l.debug(() => `WASM created ${elapsed.join(', ')}`);

  return instance;
}
