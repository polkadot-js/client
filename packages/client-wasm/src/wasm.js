// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isObject = require('@polkadot/util/is/object');

const { createImports, createInstance, createModule } = require('./create');

module.exports = class Wasm {
  constructor (instance: WebAssemblyInstance) {
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

  static fromCode (bytecode: Uint8Array, _imports?: WebAssemblyImports): Wasm {
    const module = createModule(bytecode);
    const imports = createImports(_imports);
    const instance = createInstance(module, imports);

    return new Wasm(instance);
  }
};
