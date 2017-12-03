// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isUint8Array = require('@polkadot/util/is/uint8Array');

module.exports = function createModule (code: Uint8Array): WebAssemblyModule {
  assert(code, 'Bytecode needs to be provided');

  assert(isUint8Array(code), 'Cannot create from non-Uint8Array');

  assert(WebAssembly.validate(code), 'Invalid wasm bytecode supplied');

  return new WebAssembly.Module(code);
};
