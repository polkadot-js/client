// ISC, Copyright 2017 Jaco Greeff

const createKoa = require('./koa');

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
    ).toBeDefined();
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
      }).ws
    ).toBeDefined();
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
    ).toBeDefined();
  });
});
