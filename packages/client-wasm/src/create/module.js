// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');

module.exports = function createModule (bytecode: Uint8Array): WebAssemblyModule {
  assert(WebAssembly.validate(bytecode), 'Expected valid wasm bytecode');

  return new WebAssembly.Module(bytecode);
};
