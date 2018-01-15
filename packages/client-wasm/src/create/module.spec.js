// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { loadWasm } = require('../../test/helpers');
const { createModule } = require('./index');

describe('createModule', () => {
  let code;
  let origModule;
  let constructSpy;

  beforeEach(() => {
    code = loadWasm('addTwo.wasm');
    constructSpy = jest.fn();
    origModule = WebAssembly.Module;

    WebAssembly.Module = class {
      constructor (code) {
        constructSpy(code);
      }
    };
  });

  afterEach(() => {
    WebAssembly.Module = origModule;
  });

  it('throws error on non-Wasm inputs', () => {
    expect(
      () => createModule(new Uint8Array([1, 2, 3]))
    ).toThrow(/valid wasm bytecode/);
  });

  it('calls the Module constructor with the code', () => {
    createModule(code);

    expect(constructSpy).toHaveBeenCalledWith(code);
  });

  it('returns a WebAssemly.Module instance', () => {
    const module = createModule(code);

    expect(
      isInstanceOf(module, WebAssembly.Module)
    ).toEqual(true);
  });
});
