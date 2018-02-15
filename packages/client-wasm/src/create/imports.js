// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeInterface } from '@polkadot/client-wasm-runtime/types';

// flowlint-next-line unclear-type:off
module.exports = function createImports (memory: WebAssembly.Memory, table: WebAssembly.Table, runtime: RuntimeInterface, imported?: Object = {}): WebAssemblyImports {
  const exported = Object.keys(runtime.exports).reduce((result, key) => {
    result[`ext_${key}`] = runtime.exports[key];

    return result;
  }, {});

  return Object.assign({}, imported, {
    env: Object.assign({}, exported, {
      memory,
      memoryBase: 0,
      table,
      tableBase: 0
    }, imported.env || {})
  });
};
