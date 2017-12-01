// ISC, Copyright 2017 Jaco Greeff
// @flow

const DEFAULT_MEMORY: WebAssemblyMemory$Config = {
  initial: 256
};
const DEFAULT_TABLE: WebAssemblyTable$Config = {
  initial: 0,
  element: 'anyfunc'
};

module.exports = function createImports (imports?: WebAssemblyImports): WebAssemblyImports {
  imports = imports || {};

  imports.env = imports.env || {};
  imports.env.memoryBase = imports.env.memoryBase || 0;
  imports.env.tableBase = imports.env.tableBase || 0;

  if (!imports.env.memory) {
    imports.env.memory = new WebAssembly.Memory(DEFAULT_MEMORY);
  }

  if (!imports.env.table) {
    imports.env.table = new WebAssembly.Table(DEFAULT_TABLE);
  }

  return imports;
};
