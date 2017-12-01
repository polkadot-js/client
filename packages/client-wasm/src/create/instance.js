// ISC, Copyright 2017 Jaco Greeff
// @flow

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createImports = require('./imports');

module.exports = function createInstance (module?: WebAssemblyModule, imports?: WebAssemblyImports): WebAssemblyInstance {
  if (!module) {
    throw new Error('WebAssembly module to be provided');
  }

  if (!isInstanceOf(module, WebAssembly.Module)) {
    throw new Error('Cannot create from non-WebAssembly.Module');
  }

  return new WebAssembly.Instance(module, createImports(imports));
};
