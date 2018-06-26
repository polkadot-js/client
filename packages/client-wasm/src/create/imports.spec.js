// Copyright 2017-2018 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import createImports from './imports';

describe('createImports', () => {
  it('allows empry table & memory', () => {
    expect(
      createImports(void 0, void 0, {}).env
    ).toMatchObject({});
  });

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

  it('exposes the runtime imports', () => {
    expect(
      createImports({}, {}, { test: { foo: 'bar', baz: 'biz' } })
    ).toMatchObject({
      test: {
        'foo': 'bar',
        'baz': 'biz'
      }
    });
  });

  it('exposes the runtime imports (env)', () => {
    expect(
      createImports({}, {}, { env: { foo: 'bar', baz: 'biz' } }).env
    ).toMatchObject({
      'foo': 'bar',
      'baz': 'biz'
    });
  });
});
