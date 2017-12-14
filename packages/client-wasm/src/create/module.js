// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isUint8Array = require('@polkadot/util/is/uint8Array');

module.exports = function createModule (bytecode: Uint8Array): WebAssemblyModule {
  assert(isUint8Array(bytecode), 'Expected bytecode as Uint8Array');
  assert(WebAssembly.validate(bytecode), 'Expected valid wasm bytecode');

  return new WebAssembly.Module(bytecode);
};
