// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createImports = require('./imports');

module.exports = function createInstance (module: WebAssemblyModule, imports?: WebAssemblyImports): WebAssemblyInstance {
  assert(module, 'WebAssembly module to be provided');

  assert(isInstanceOf(module, WebAssembly.Module), 'Cannot create from non-WebAssembly.Module');

  return new WebAssembly.Instance(module, createImports(imports));
};
