// ISC, Copyright 2017 Jaco Greeff
// @flow

/* global WebAssembly */

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createImports = require('./imports');

module.exports = function createInstance (module?: WebAssembly$Module, imports?: WebAssembly$Imports): Promise<WebAssembly$Instance> {
  if (!module) {
    throw new Error('WebAssembly module to be provided');
  }

  if (!isInstanceOf(module, WebAssembly.Module)) {
    throw new Error('Cannot create from non-WebAssembly.Module');
  }

  return new WebAssembly.Instance(module, createImports(imports));
};
