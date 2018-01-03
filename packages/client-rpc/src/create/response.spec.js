// ISC, Copyright 2017-2018 Jaco Greeff

const { createResponse } = require('./index');

describe('createResponse', () => {
  it('creates a valid JsonRpc structure', () => {
    expect(
      createResponse(123, 'test result')
    ).toEqual({
      id: 123,
      jsonrpc: '2.0',
      result: 'test result'
    });
  });
});
