// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import createKoa from './koa';

describe('createKoa', () => {
  it('creates an HTTP interface', () => {
    expect(
      createKoa({
        handlers: {
          http: () => true,
          ws: () => true
        },
        path: '/',
        types: ['http']
      })
    ).toHaveLength(1);
  });

  it('creates an WS interface', () => {
    expect(
      createKoa({
        handlers: {
          http: () => true,
          ws: () => true
        },
        path: '/',
        types: ['ws']
      })
    ).toHaveLength(1);
  });

  it('creates an HTTP + WS interface', () => {
    expect(
      createKoa({
        handlers: {
          http: () => true,
          ws: () => true
        },
        path: '/',
        types: ['http', 'ws']
      })
    ).toHaveLength(2);
  });
});
