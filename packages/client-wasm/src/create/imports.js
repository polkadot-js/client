// ISC, Copyright 2017 Jaco Greeff
// @flow

const runtime = require('@polkadot/client-wasm-runtime');

const createMemory = require('./memory');
const createTable = require('./table');

module.exports = function createImports (imports?: WebAssemblyImports = {}): WebAssemblyImports {
  imports.env = imports.env || {};
  imports.env.memoryBase = imports.env.memoryBase || 0;
  imports.env.tableBase = imports.env.tableBase || 0;

  if (!imports.env.memory) {
    // $FlowFixMe imports.env gets a value above
    imports.env.memory = createMemory();
  }

  if (!imports.env.table) {
    // $FlowFixMe imports.env gets a value above
    imports.env.table = createTable();
  }

  imports.env = Object.assign(imports.env, runtime(imports.env.memory));

  return imports;
};
