// ISC, Copyright 2017 Jaco Greeff

const createImports = require('./imports');

describe('createImports', () => {
  let imports;
  let origWebAssembly;
  let constructMemorySpy;
  let constructTableSpy;

  beforeEach(() => {
    imports = {};
    constructMemorySpy = jest.fn();
    constructTableSpy = jest.fn();
    origWebAssembly = global.WebAssembly;

    global.WebAssembly = class {
      static Memory = class {
        constructor (opts) {
          constructMemorySpy(opts);
        }
      };
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

  it('works when import has not been specified', () => {
    expect(
      createImports()
    ).toBeDefined();
  });

  it('uses env.memoryBase when supplied', () => {
    imports.env = { memoryBase: 'test' };
    imports = createImports(imports);

    expect(imports.env.memoryBase).toEqual('test');
  });

  it('uses env.tableBase when supplied', () => {
    imports.env = { tableBase: 'test' };
    imports = createImports(imports);

    expect(imports.env.tableBase).toEqual('test');
  });

  it('uses env.memory when supplied', () => {
    imports.env = { memory: 'test' };
    imports = createImports(imports);

    expect(imports.env.memory).toEqual('test');
  });

  it('uses env.table when supplied', () => {
    imports.env = { table: 'test' };
    imports = createImports(imports);

    expect(imports.env.table).toEqual('test');
  });

  it('sets default environment when none supplied', () => {
    imports = createImports();

    expect(imports.env).toBeDefined();
  });
});
