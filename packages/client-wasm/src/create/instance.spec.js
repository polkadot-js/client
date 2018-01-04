// ISC, Copyright 2017-2018 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createInstance } = require('./index');

describe('createInstance', () => {
  let origWebAssembly;
  let constructInstanceSpy;

  beforeEach(() => {
    constructInstanceSpy = jest.fn();
    origWebAssembly = global.WebAssembly;

    global.WebAssembly = class {
      static Module = class {};
      static Memory = class {};
      static Table = class {};
      static Instance = class {
        constructor (module, imports) {
          constructInstanceSpy(module, imports);
        }
      };
    };
  });

  afterEach(() => {
    global.WebAssembly = origWebAssembly;
  });

  it('creates an instance with the module & imports', () => {
    const module = new WebAssembly.Module();
    const imports = {};

    createInstance(module, imports);

    expect(constructInstanceSpy).toHaveBeenCalledWith(module, imports);
  });

  it('returns an WebAssembly.Instance', () => {
    const module = new WebAssembly.Module();
    const imports = {};
    const instance = createInstance(module, imports);

    expect(
      isInstanceOf(instance, WebAssembly.Instance)
    ).toEqual(true);
  });
});
