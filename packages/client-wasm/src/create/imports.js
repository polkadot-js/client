// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

// flowlint-next-line unclear-type:off
module.exports = function createImports (memory: WebAssembly.Memory, table: WebAssembly.Table, imported: Object): WebAssemblyImports {
  return Object.assign({}, imported, {
    env: Object.assign({
      memory,
      memoryBase: 0,
      table,
      tableBase: 0
    }, imported.env || {})
  });
};
