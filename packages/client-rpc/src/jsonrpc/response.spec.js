// ISC, Copyright 2017 Jaco Greeff

const createResponse = require('./response');

describe('jsonrpc/response', () => {
  describe('createResponse', () => {
    it('creates a valid JSONRPC structure', () => {
      expect(
        createResponse(123, 'test result')
      ).toEqual({
        id: 123,
        jsonrpc: '2.0',
        result: 'test result'
      });
    });
  });
});
