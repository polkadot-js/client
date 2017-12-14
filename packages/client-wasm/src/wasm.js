// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');
const isObject = require('@polkadot/util/is/object');

const { createInstance, createModule } = require('./create');

module.exports = class Wasm {
  constructor (instance: WebAssemblyInstance) {
    assert(isInstanceOf(instance, WebAssembly.Instance), 'Expected WebAssembly.Instance');

    const exports = instance.exports;

    assert(isObject(exports), 'Expected function exports');

    Object.keys(exports).forEach((key: string) => {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        value: exports[key]
      });
    });
  }

  static fromCode (bytecode: Uint8Array, imports?: WebAssemblyImports): Wasm {
    const module = createModule(bytecode);
    const instance = createInstance(module, imports);

    return new Wasm(instance);
  }
};
