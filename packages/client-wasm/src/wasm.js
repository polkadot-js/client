// ISC, Copyright 2017 Jaco Greeff
// @flow

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createInstance, createModule } = require('./create');

module.exports = class Wasm {
  constructor (instance?: WebAssemblyInstance) {
    if (!instance) {
      throw new Error('No instance specified');
    }

    if (!isInstanceOf(instance, WebAssembly.Instance)) {
      throw new Error('WebAssembly instance to be provided');
    }

    const exports = instance.exports;

    if (!instance.exports) {
      throw new Error('No exports found on WebAssembly instance');
    }

    Object.keys(exports).forEach((key: string) => {
      // $FlowFixMe naughty...
      this[key] = exports[key];
    });
  }

  static fromCode (code?: Uint8Array, imports?: WebAssemblyImports): Wasm {
    const module = createModule(code);
    const instance = createInstance(module, imports);

    return new Wasm(instance);
  }
};
