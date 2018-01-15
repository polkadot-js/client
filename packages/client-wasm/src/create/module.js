// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const assert = require('@polkadot/util/assert');

module.exports = function createModule (bytecode: Uint8Array): WebAssemblyModule {
  assert(WebAssembly.validate(bytecode), 'Expected valid wasm bytecode');

  return new WebAssembly.Module(bytecode);
};
