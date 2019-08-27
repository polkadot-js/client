// Copyright 2017-2019 @polkadot/client-wasm authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createImports from './imports';

describe('createImports', (): void => {
  it('allows empry table & memory', (): void => {
    expect(
      createImports(undefined, undefined, {}).env
    ).toMatchObject({});
  });

  it('sets the memoryBase & tableBase', (): void => {
    expect(
      createImports({} as any, {} as any, {}).env
    ).toMatchObject({
      memoryBase: 0,
      tableBase: 0
    });
  });

  it('uses supplied memory', (): void => {
    const memory: any = { some: { memory: { object: true } } };

    expect(
      createImports(memory, {} as any, {}).env
    ).toMatchObject({
      memory
    });
  });

  it('uses supplied table', (): void => {
    const table = { some: { table: { object: true } } } as any;

    expect(
      createImports({} as any, table, {}).env
    ).toMatchObject({
      table
    });
  });

  it('exposes the runtime imports', (): void => {
    expect(
      createImports({} as any, {} as any, { test: { foo: 'bar', baz: 'biz' } })
    ).toMatchObject({
      test: {
        foo: 'bar',
        baz: 'biz'
      }
    });
  });

  it('exposes the runtime imports (env)', (): void => {
    expect(
      createImports({} as any, {} as any, { env: { foo: 'bar', baz: 'biz' } }).env
    ).toMatchObject({
      foo: 'bar',
      baz: 'biz'
    });
  });
});
