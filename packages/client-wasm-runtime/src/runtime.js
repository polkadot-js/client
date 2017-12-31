// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RuntimeType } from './types';

// 2 ^ 14 https://github.com/jfbastien/musl/blob/190dffd1415cc8be52d4659aced51625d63bdbc1/arch/wasm32/wasm.js#L403
const START_OFFSET = 16384;

module.exports = function runtime ({ buffer }: WebAssembly.Memory): RuntimeType {
  return {
    heap: {
      alloc: {},
      freed: {},
      offset: START_OFFSET,
      size: buffer.byteLength,
      uint8: new Uint8Array(buffer)
    }
  };
};
