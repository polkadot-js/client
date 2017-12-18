// ISC, Copyright 2017 Jaco Greeff

const ExtError = require('@polkadot/util/ext/error');
const isFunction = require('@polkadot/util/is/function');
const HttpProvider = require('@polkadot/api-provider/http');
const WsProvider = require('@polkadot/api-provider/ws');

const Server = require('./server');

describe('Server', () => {
  let server;
  let handlers;
  let testSpy;

  beforeEach(() => {
    testSpy = jest.fn(() => Promise.resolve('test'));
    handlers = {
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
    };
  });

  afterEach(() => {
    testSpy.mockRestore();

    if (server) {
      server.stop();
      server = null;
    }
  });

  describe('_handleMessage', () => {
    beforeEach(() => {
      server = new Server({
        config: {
          rpc: {
            path: '/',
            types: ['http']
          }
        }
      }, handlers, false);
    });

    it('fails when invalid JSON', () => {
      return server._handleMessage('notJson').then((result) => {
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

      return server._handleMessage(message).then((result) => {
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

      return server._handleMessage(message).then((result) => {
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

      return server._handleMessage(message).then((result) => {
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

      return server._handleMessage(message).then((result) => {
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

      return server._handleMessage(message).then((result) => {
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

      return server._handleMessage(message).then((result) => {
        expect(result).toMatchObject({
          id: 1,
          result: 'test'
        });
      });
    });
  });

  describe('_handleWs', () => {
    let context;
    let handler;
    let server;

    beforeEach(() => {
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
      server = new Server({
        config: {
          rpc: {
            path: '/',
            port: 9901,
            types: ['ws']
          }
        }
      }, handlers, false);
    });

    it('registers a handler for messages', () => {
      server._handleWs(context);

      expect(
        isFunction(handler)
      ).toEqual(true);
    });

    it('calls the socket with the result', () => {
      server._handleWs(context);

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

  describe('stop', () => {
    beforeEach(() => {
      server = new Server({
        config: {
          rpc: {
            path: '/',
            port: 9901,
            types: ['http']
          }
        }
      }, handlers, false);
      server._server = {
        close: () => true
      };
    });

    it('returns false when internal server not started', () => {
      server._server = null;

      return server.stop().then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('calls stop() on the internal server', (done) => {
      server._server = {
        close: () => {
          expect(server._server).toEqual(null);
          done();
        }
      };

      server.stop();
    });

    it('emits the stopped event', (done) => {
      server.on('stopped', () => {
        done();
      });

      server.stop();
    });

    it('returns true when completed', () => {
      return server.stop().then((result) => {
        expect(result).toEqual(true);
      });
    });
  });

  it('starts and accepts requests, sending responses (HTTP)', () => {
    server = new Server({
      config: {
        rpc: {
          path: '/',
          port: 9901,
          types: ['http']
        }
      }
    }, handlers); // eslint-disable-line

    return new HttpProvider('http://localhost:9901')
      .send('echo', [1, 'http', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,http,true');
      });
  });

  it('starts and accepts requests, sending responses (WS)', () => {
    server = new Server({
      config: {
        rpc: {
          path: '/',
          port: 9901,
          types: ['ws']
        }
      }
    }, handlers); // eslint-disable-line

    return new WsProvider('ws://localhost:9901')
      .send('echo', [1, 'ws', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,ws,true');
      });
  });

  it('starts and accepts requests, sending responses (HTTP & WS)', () => {
    server = new Server({
      config: {
        rpc: {
          path: '/',
          port: 9901,
          types: ['http', 'ws']
        }
      }
    }, handlers); // eslint-disable-line

    return new WsProvider('ws://localhost:9901')
      .send('echo', [1, 'ws', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,ws,true');

        return new HttpProvider('http://localhost:9901')
          .send('echo', [1, 'http', true])
          .then((result) => {
            expect(result).toEqual('echo: 1,http,true');
          });
      });
  });
});
