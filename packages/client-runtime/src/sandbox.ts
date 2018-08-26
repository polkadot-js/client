// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RuntimeInterface$Sandbox, RuntimeEnv, Pointer } from './types';

// TODO Implement according to https://github.com/paritytech/polkadot/tree/master/substrate/runtime-sandbox

const uninmplemented = (name: string): any => {
  throw new Error(`sandbox: ${name} not implemented, only stubbed`);
};

export default function sandbox (env: RuntimeEnv): RuntimeInterface$Sandbox {
  return {
    sandbox_instantiate: (a: number, b: number, c: number, d: number, e: number, f: number): number =>
      uninmplemented('sandbox_instantiate'),
    sandbox_instance_teardown: (instanceIdx: number): void =>
      uninmplemented('sandbox_instance_teardown'),
    sandbox_invoke: (instanceIdx: number, b: number, c: number, d: number): number =>
      uninmplemented('sandbox_invoke'),
    sandbox_invoke_poc2: (instanceIdx: number, exportPtr: Pointer, exportLen: number, argsPtr: Pointer, argsLen: number, returnValPtr: Pointer, returnValLen: number, state: number): number =>
      uninmplemented('sandbox_invoke_poc2'),
    sandbox_memory_get: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      uninmplemented('sandbox_memory_get'),
    sandbox_memory_new: (initial: number, maximum: number): number =>
      uninmplemented('sandbox_memory_new'),
    sandbox_memory_set: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      uninmplemented('sandbox_memory_set'),
    sandbox_memory_teardown: (memoryIdx: number): void =>
      uninmplemented('sandbox_memory_teardown')
  };
}
