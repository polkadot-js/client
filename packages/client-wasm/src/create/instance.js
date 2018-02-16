// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function createInstance (wasmModule: WebAssemblyModule, imports: WebAssemblyImports): WebAssemblyInstance {
  return new WebAssembly.Instance(wasmModule, imports);
};
