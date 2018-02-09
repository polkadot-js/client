// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { createImports } = require('./index');

describe('createImports', () => {
  it('sets the memoryBase & tableBase', () => {
    expect(
      createImports({}, {}, { exports: {} }).env
    ).toMatchObject({
      memoryBase: 0,
      tableBase: 0
    });
  });

  it('uses supplied memory', () => {
    const memory = { 'some': { 'memory': { 'object': true } } };

    expect(
      createImports(memory, {}, { exports: {} }).env
    ).toMatchObject({
      memory
    });
  });

  it('uses supplied table', () => {
    const table = { 'some': { 'table': { 'object': true } } };

    expect(
      createImports({}, table, { exports: {} }).env
    ).toMatchObject({
      table
    });
  });

  it('exposes the runtime imports on the env', () => {
    expect(
      createImports({}, {}, { exports: { foo: 'bar', baz: 'biz' } }).env
    ).toMatchObject({
      'ext_foo': 'bar',
      'ext_baz': 'biz'
    });
  });
});
