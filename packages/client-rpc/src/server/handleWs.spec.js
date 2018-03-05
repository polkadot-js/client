// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('@polkadot/util/is/function');

const handleWs = require('./handleWs');

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
      }
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
