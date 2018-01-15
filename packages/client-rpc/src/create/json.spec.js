// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

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
