// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv, PointerType } from './types';

const l = require('@polkadot/util/logger')('runtime');

// 2 ^ 14 https://github.com/jfbastien/musl/blob/190dffd1415cc8be52d4659aced51625d63bdbc1/arch/wasm32/wasm.js#L403
const START_OFFSET = 16384;

module.exports = function createEnv ({ buffer }: WebAssembly.Memory, storage: DbInterface): RuntimeEnv {
  const uint8 = new Uint8Array(buffer);

  return {
    l,
    storage,
    heap: {
      uint8,
      alloc: {},
      freed: {},
      offset: START_OFFSET,
      size: buffer.byteLength,
      dup: (ptr: PointerType, len: number): Uint8Array => uint8.slice(ptr, ptr + len),
      get: (ptr: PointerType, len: number): Uint8Array => uint8.subarray(ptr, ptr + len),
      set: (ptr: PointerType, data: Uint8Array): void => uint8.set(data, ptr)
    }
  };
};
