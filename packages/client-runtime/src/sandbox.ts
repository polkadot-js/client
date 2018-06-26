// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RuntimeInterface$Sandbox, RuntimeEnv, Pointer } from './types';

import instrument from './instrument';

// TODO Implement according to https://github.com/paritytech/polkadot/tree/master/substrate/runtime-sandbox

export default function sandbox ({ l }: RuntimeEnv): RuntimeInterface$Sandbox {
  l.warn('sandbox not implemented, only stubbed');

  return {
    sandbox_instantiate: (a: number, b: number, c: number, d: number, e: number, f: number): number =>
      instrument('sandbox_instantiate', (): number => 0),
    sandbox_instance_teardown: (instanceIdx: number): void =>
      instrument('sandbox_instance_teardown', (): void => undefined),
    sandbox_invoke: (instanceIdx: number, b: number, c: number, d: number): number =>
      instrument('sandbox_invoke', (): number => 0),
    sandbox_invoke_poc2: (instanceIdx: number, exportPtr: Pointer, exportLen: number, argsPtr: Pointer, argsLen: number, returnValPtr: Pointer, returnValLen: number, state: number): number =>
      instrument('sandbox_invoke_poc2', (): number => 0),
    sandbox_memory_get: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      instrument('sandbox_memory_get', (): number => 0),
    sandbox_memory_new: (initial: number, maximum: number): number =>
      instrument('sandbox_memory_new', (): number => 0),
    sandbox_memory_set: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      instrument('sandbox_memory_set', (): number => 0),
    sandbox_memory_teardown: (memoryIdx: number): void =>
      instrument('sandbox_memory_teardown', (): void => undefined)
  };
}
