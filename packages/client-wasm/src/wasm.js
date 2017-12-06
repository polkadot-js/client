// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('@polkadot/util/assert');
const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createInstance, createModule } = require('./create');

module.exports = class Wasm {
  constructor (instance: WebAssemblyInstance) {
    assert(instance, 'No instance specified');

    assert(isInstanceOf(instance, WebAssembly.Instance), 'WebAssembly instance to be provided');

    const exports = instance.exports;

    assert(exports, 'No exports found on WebAssembly instance');

    Object.keys(exports).forEach((key: string) => {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        value: exports[key]
      });
      // $FlowFixMe naughty...
      // this[key] = exports[key];
    });
  }

  static fromCode (code: Uint8Array, imports?: WebAssemblyImports): Wasm {
    const module = createModule(code);
    const instance = createInstance(module, imports);

    return new Wasm(instance);
  }
};
