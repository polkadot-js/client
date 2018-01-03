// ISC, Copyright 2017-2018 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createMemory } = require('./index');

describe('createMemory', () => {
  let globalWasm;
  let constructInstanceSpy;

  beforeEach(() => {
    globalWasm = global.WebAssembly;
    constructInstanceSpy = jest.fn();

    global.WebAssembly = class {
      static Memory = class {
        constructor (defaults) {
          constructInstanceSpy(defaults);
        }
      };
    };
  });

  afterEach(() => {
    global.WebAssembly = globalWasm;
  });

  it('expects initial <= maximum', () => {
    expect(
      () => createMemory(1024, 64)
    ).toThrow(/initial size to be/);
  });

  it('expects initial size to fit into page', () => {
    expect(
      () => createMemory(32 * 1024, 32 * 1024)
    ).toThrow(/Expected intial to be multiple/);
  });

  it('expects maximum size to fit into page', () => {
    expect(
      () => createMemory(64 * 1024, 96 * 1024)
    ).toThrow(/Expected maximum to be multiple/);
  });

  it('constructs WebAssembly.Memory with defaults', () => {
    createMemory();

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 8 * 1024 / 64,
      maximum: 8 * 1024 / 64
    });
  });

  it('constructs WebAssembly.Memory with provided values', () => {
    createMemory(4 * 1024 * 1024, 4 * 1024 * 1024);

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 4 * 1024 / 64,
      maximum: 4 * 1024 / 64
    });
  });

  it('returns a WebAssemblt.Memory instance', () => {
    expect(
      isInstanceOf(
        createMemory(), WebAssembly.Memory
      )
    ).toEqual(true);
  });
});
