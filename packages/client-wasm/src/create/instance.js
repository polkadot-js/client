// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createImports = require('./imports');

module.exports = function createInstance (module: WebAssemblyModule, imports?: WebAssemblyImports): WebAssemblyInstance {
  assert(isInstanceOf(module, WebAssembly.Module), 'Expected WebAssembly.Module');

  return new WebAssembly.Instance(module, createImports(imports));
};
