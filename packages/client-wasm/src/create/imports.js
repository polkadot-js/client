// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeExports } from '@polkadot/client-wasm-runtime/types';

// flowlint-next-line unclear-type:off
module.exports = function createImports (memory: WebAssembly.Memory, table: WebAssembly.Table, runtime: RuntimeExports, imports?: Object = {}): WebAssemblyImports {
  return Object.assign({}, imports, {
    env: Object.assign({}, runtime, {
      memory,
      memoryBase: 0,
      table,
      tableBase: 0
    })
  });
};
