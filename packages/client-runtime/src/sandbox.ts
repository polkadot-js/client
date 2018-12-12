// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeInterface$Sandbox, RuntimeEnv, Pointer } from './types';

import unimplemented from './unimplemented';

// TODO Implement according to https://github.com/paritytech/polkadot/tree/master/substrate/runtime-sandbox

export default function sandbox (env: RuntimeEnv): RuntimeInterface$Sandbox {
  return {
    sandbox_instantiate: (a: number, b: number, c: number, d: number, e: number, f: number): number =>
      unimplemented('sandbox_instantiate'),
    sandbox_instance_teardown: (instanceIdx: number): void =>
      unimplemented('sandbox_instance_teardown'),
    sandbox_invoke: (instanceIdx: number, exportPtr: Pointer, exportLen: number, argsPtr: Pointer, argsLen: number, returnValPtr: Pointer, returnValLen: number, state: number): number =>
      unimplemented('sandbox_invoke'),
    sandbox_memory_get: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      unimplemented('sandbox_memory_get'),
    sandbox_memory_new: (initial: number, maximum: number): number =>
      unimplemented('sandbox_memory_new'),
    sandbox_memory_set: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      unimplemented('sandbox_memory_set'),
    sandbox_memory_teardown: (memoryIdx: number): void =>
      unimplemented('sandbox_memory_teardown')
  };
}
