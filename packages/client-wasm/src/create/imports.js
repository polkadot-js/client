// ISC, Copyright 2017-2018 Jaco Greeff
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
