// ISC, Copyright 2017 Jaco Greeff

const runtime = require('@polkadot/client-wasm-runtime');
const isInstanceOf = require('@polkadot/util/is/instanceOf');

const { createImports } = require('./index');

describe('createImports', () => {
  let imports;
  let origWebAssembly;

  beforeEach(() => {
    imports = {};
    origWebAssembly = global.WebAssembly;

    global.WebAssembly = class {
      static Memory = class {
        constructor () {
          this.buffer = new Uint8Array(10);
        }
      };
      static Table = class {};
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

  it('exposes the default imports on env', () => {
    expect(
      createImports({}).env
    ).toMatchObject(
      Object.keys(runtime).reduce((env, key) => {
        env[key] = expect.anything();

        return env;
      }, {})
    );
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
    const memory = { buffer: new Uint8Array(10) };

    imports.env = { memory };
    imports = createImports(imports);

    expect(imports.env.memory).toEqual(memory);
  });

  it('creates env.memory when none supplied', () => {
    imports = createImports(imports);

    expect(
      isInstanceOf(
        imports.env.memory, WebAssembly.Memory
      )
    ).toEqual(true);
  });

  it('uses env.table when supplied', () => {
    imports.env = { table: 'test' };
    imports = createImports(imports);

    expect(imports.env.table).toEqual('test');
  });

  it('creates env.table when none supplied', () => {
    imports = createImports(imports);

    expect(
      isInstanceOf(
        imports.env.table, WebAssembly.Table
      )
    ).toEqual(true);
  });

  it('sets default environment when none supplied', () => {
    imports = createImports();

    expect(imports.env).toBeDefined();
  });
});
