// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ExtError } from '@polkadot/util';

const mockExtError = ExtError;
const mockHandlers = ({
  errorThrow: () => {
    throw new Error('errorThrow');
  },
  errorThrowEx: () => {
    throw new mockExtError('errorThrowEx', -123);
  },
  errorRet: () => {
    return Promise.resolve(new Error('errorRet'));
  },
  errorRetEx: () => {
    return Promise.resolve(new mockExtError('errorRetEx', -456));
  },
  test: jest.fn(() => Promise.resolve('test')),
  echo: (...params) => Promise.resolve(`echo: ${params.join(', ')}`)
});

jest.mock('./handlers', () => () => mockHandlers);

import Rpc from '.';

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

    return server.handleMessage(message).then((result) => {
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

    return server.handleMessage(message).then((result) => {
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

    return server.handleMessage(message).then((result) => {
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

    return server.handleMessage(message).then((result) => {
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

    return server.handleMessage(message).then((result) => {
      expect(result).toMatchObject({
        id: 1,
        result: 'test'
      });
    });
  });
});
