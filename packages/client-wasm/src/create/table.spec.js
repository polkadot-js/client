// ISC, Copyright 2017-2018 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createTable } = require('./index');

describe('createTable', () => {
  let origWebAssembly;
  let constructTableSpy;

  beforeEach(() => {
    constructTableSpy = jest.fn();
    origWebAssembly = global.WebAssembly;

    global.WebAssembly = class {
      static Table = class {
        constructor (opts) {
          constructTableSpy(opts);
        }
      };
    };
  });

  afterEach(() => {
    global.WebAssembly = origWebAssembly;
  });

  it('creates a valid instance', () => {
    expect(
      createTable()
    ).toBeDefined();
  });

  it('creates a valid WebAssembly.Memory instance', () => {
    expect(
      isInstanceOf(
        createTable(), WebAssembly.Table
      )
    ).toEqual(true);
  });

  it('uses sane defaults', () => {
    createTable();

    expect(
      constructTableSpy
    ).toHaveBeenCalledWith({
      initial: 0,
      element: 'anyfunc'
    });
  });
});
