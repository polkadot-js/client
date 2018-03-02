// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const ExtError = require('@polkadot/util/ext/error');

const handleMessage = require('./message');

describe('handleMessage', () => {
  let self;
  let testSpy;

  beforeEach(() => {
    self = {
      config: {
        rpc: {
          port: 9901,
          path: '/',
          types: ['http']
        }
      },
      handlers: {
        errorThrow: () => {
          throw new Error('errorThrow');
        },
        errorThrowEx: () => {
          throw new ExtError('errorThrowEx', -123);
        },
        errorRet: () => {
          return Promise.resolve(new Error('errorRet'));
        },
        errorRetEx: () => {
          return Promise.resolve(new ExtError('errorRetEx', -456));
        },
        test: testSpy,
        echo: (...params) => Promise.resolve(`echo: ${params.join(', ')}`)
      }
    };
    testSpy = jest.fn(() => Promise.resolve('test'));
  });

  it('fails when invalid JSON', () => {
    return handleMessage(self, 'notJson').then((result) => {
      expect(result).toMatchObject({
        id: 0,
        error: {
          code: ExtError.CODES.UNKNOWN,
          message: expect.stringMatching(/JSON/)
        }
      });
    });
  });

  it('fails when the validation fails', () => {
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: 'notNumber'
    });

    return handleMessage(self, message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: ExtError.CODES.INVALID_JSONRPC,
          message: 'Expected a numeric id'
        }
      });
    });
  });

  it('fails when no handler has been defined', () => {
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'noSuchThing'
    });

    return handleMessage(self, message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: ExtError.CODES.METHOD_NOT_FOUND,
          message: "Method 'noSuchThing' not found"
        }
      });
    });
  });

  it('calls the handler when defined', () => {
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'test',
      params: ['a', 'b']
    });

    return handleMessage(self, message).then((result) => {
      expect(testSpy).toHaveBeenCalledWith(['a', 'b']);
    });
  });

  it('fails when handler throws an error', () => {
    const message = JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'errorThrow',
      params: []
    });

    return handleMessage(self, message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: ExtError.CODES.UNKNOWN,
          message: 'errorThrow'
        }
      });
    });
  });

  it('fails when handler returns an error', () => {
    const message = JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'errorRet',
      params: []
    });

    return handleMessage(self, message).then((result) => {
      expect(result).toMatchObject({
        id: 1,
        error: {
          code: ExtError.CODES.UNKNOWN,
          message: 'errorRet'
        }
      });
    });
  });

  it('succeeds with valid result', () => {
    const message = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'test',
      params: ['a', 'b']
    });

    return handleMessage(self, message).then((result) => {
      expect(result).toMatchObject({
        id: 1,
        result: 'test'
      });
    });
  });
});
