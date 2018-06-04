// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface$Sandbox, RuntimeEnv, Pointer } from './types';

// TODO Implement according to https://github.com/paritytech/polkadot/tree/master/substrate/runtime-sandbox

module.exports = function sandbox ({ l }: RuntimeEnv): RuntimeInterface$Sandbox {
  l.warn('sandbox not implemented, only stubbed');

  return {
    sandbox_instantiate: (a: number, b: number, c: number, d: number, e: number, f: number): number =>
      0,
    sandbox_instance_teardown: (instanceIdx: number): void =>
      undefined,
    sandbox_invoke: (instanceIdx: number, b: number, c: number, d: number): number =>
      0,
    sandbox_memory_get: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      0,
    sandbox_memory_new: (initial: number, maximum: number): number =>
      0,
    sandbox_memory_set: (memoryIdx: number, offset: number, ptr: Pointer, len: number): number =>
      0,
    sandbox_memory_teardown: (memoryIdx: number): void =>
      undefined
  };
};
