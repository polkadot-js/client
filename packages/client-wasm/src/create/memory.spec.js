// Copyright 2017-2018 @polkadot/client-wasm authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { HEAP_SIZE_KB } = require('../defaults');
const createMemory = require('./memory');

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
      () => createMemory(16, 8)
    ).toThrow(/initial size to be/);
  });

  it('constructs WebAssembly.Memory with defaults', () => {
    createMemory();

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: HEAP_SIZE_KB / 16,
      maximum: HEAP_SIZE_KB / 16
    });
  });

  it('constructs WebAssembly.Memory with provided values', () => {
    createMemory(256, 512);

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 256 / 16,
      maximum: 512 / 16
    });
  });

  it('constructs WebAssembly.Memory with minimum values', () => {
    createMemory(0, 0);

    expect(
      constructInstanceSpy
    ).toHaveBeenCalledWith({
      initial: 8,
      maximum: 8
    });
  });

  it('returns a WebAssembly.Memory instance', () => {
    expect(
      isInstanceOf(
        createMemory(), WebAssembly.Memory
      )
    ).toEqual(true);
  });
});
