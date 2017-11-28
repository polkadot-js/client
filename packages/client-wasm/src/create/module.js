// ISC, Copyright 2017 Jaco Greeff
// @flow

/* global WebAssembly */

const isUint8Array = require('@polkadot/util/is/uint8Array');

module.exports = function createModule (code?: Uint8Array): Promise<WebAssembly$Module> {
  if (!code) {
    throw new Error('Bytecode needs to be provided');
  }

  if (!isUint8Array(code)) {
    throw new Error('Cannot create from non-Uint8Array');
  }

  if (!WebAssembly.validate(code)) {
    throw new Error('Invalid wasm bytecode supplied');
  }

  return new WebAssembly.Module(code);
};
