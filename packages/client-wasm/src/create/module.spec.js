// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { loadWasm } = require('../../test/helpers');
const createModule = require('./module');

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

  it('throws an error on non-Uint8Array bytecode', () => {
    expect(
      () => createModule('nonUint8Array')
    ).toThrow(/code as Uint8Array/);
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
