// ISC, Copyright 2017-2018 Jaco Greeff

const createJson = require('./json');

describe('createJson', () => {
  it('creates a valid JSONRPC structure', () => {
    expect(
      createJson(123, { some: { extra: 'data' } })
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      some: {
        extra: 'data'
      }
    });
  });
});
