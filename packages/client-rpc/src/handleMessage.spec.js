// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const MockExtError = Error;

const mockHandlers = ({
  errorThrow: () => {
    throw new Error('errorThrow');
  },
  errorThrowEx: () => {
    throw new MockExtError('errorThrowEx');
  },
  errorRet: () => {
    return Promise.resolve(new Error('errorRet'));
  },
  errorRetEx: () => {
    return Promise.resolve(new MockExtError('errorRetEx'));
  },
  test: jest.fn(() => Promise.resolve('test')),
  echo: (...params) => Promise.resolve(`echo: ${params.join(', ')}`)
});

jest.mock('./handlers', () => () => mockHandlers);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Rpc = require('.').default;

describe('handleMessage', () => {
  let server;

  beforeEach(() => {
    const config = {
      rpc: {
        port: 9901,
        path: '/',
        types: ['http']
      }
    };

    server = new Rpc(config, {});
  });

  it('fails when invalid JSON', () => {
    return server.handleMessage('notJson').then((result) => {
      expect(result).toMatchObject({
        id: 0,
        error: {
          code: -1,
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

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: -1,
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

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: -1,
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

    return server.handleMessage(message).then(() => {
      expect(mockHandlers.test).toHaveBeenCalledWith(['a', 'b']);
    });
  });

  it('fails when handler throws an error', () => {
    const message = JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'errorThrow',
      params: []
    });

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        error: {
          code: -1,
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

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        id: 1,
        error: {
          code: -1,
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

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        id: 1,
        result: 'test'
      });
    });
  });
});
