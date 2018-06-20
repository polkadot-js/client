// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isFunction from '@polkadot/util/is/function';
import logger from '@polkadot/util/logger';

import handleWs from './handleWs';

const l = logger('test');

describe('handleWs', () => {
  let self;
  let context;
  let handler;

  beforeEach(() => {
    self = {
      config: {
        rpc: {
          port: 9901,
          path: '/',
          types: ['ws']
        }
      },
      handlers: {
        test: jest.fn(() => Promise.resolve('test'))
      },
      l
    };
    context = {
      websocket: {
        on: jest.fn((type, cb) => {
          if (type === 'message') {
            handler = cb;
          }
        }),
        send: jest.fn(() => true)
      }
    };
    handler = null;
  });

  it('registers a handler for messages', () => {
    handleWs(self)(context);

    expect(
      isFunction(handler)
    ).toEqual(true);
  });

  it('calls the socket with the result', () => {
    handleWs(self)(context);

    return handler(
      JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'test',
        params: ['a', 'b']
      })
    ).then(() => {
      expect(
        context.websocket.send
      ).toHaveBeenCalledWith('{"id":1,"jsonrpc":"2.0","result":"test"}');
    });
  });
});
