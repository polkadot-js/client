// ISC, Copyright 2017-2018 Jaco Greeff

const { createImports } = require('./index');

describe('createImports', () => {
  it('sets the memoryBase & tableBase', () => {
    expect(
      createImports({}, {}, {}).env
    ).toMatchObject({
      memoryBase: 0,
      tableBase: 0
    });
  });

  it('uses supplied memory', () => {
    const memory = { 'some': { 'memory': { 'object': true } } };

    expect(
      createImports(memory, {}, {}).env
    ).toMatchObject({
      memory
    });
  });

  it('uses supplied table', () => {
    const table = { 'some': { 'table': { 'object': true } } };

    expect(
      createImports({}, table, {}).env
    ).toMatchObject({
      table
    });
  });

  it('exposes the runtime imports on the env', () => {
    const runtime = { 'ext_foo': 1, 'ext_bar': 2, 'ext_baz': 3 };

    expect(
      createImports({}, {}, runtime).env
    ).toMatchObject(runtime);
  });
});
