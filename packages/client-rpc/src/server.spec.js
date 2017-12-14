// ISC, Copyright 2017 Jaco Greeff

const ExtError = require('@polkadot/util/ext/error');
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
      server = new Server({ port: 9901 }, handlers, false);
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

  it('starts and accepts requests, sending responses (HTTP)', () => {
    server = new Server({ port: 9901, type: ['http'] }, handlers); // eslint-disable-line

    return new HttpProvider('http://localhost:9901')
      .send('echo', [1, 'http', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,http,true');
      });
  });

  // FIXME: WebSocket server does not shutdown cleanly in the test environment
  it.skip('starts and accepts requests, sending responses (WS)', () => {
    server = new Server({ port: 9901, type: ['ws'] }, handlers); // eslint-disable-line

    return new WsProvider('ws://localhost:9901')
      .send('echo', [1, 'ws', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,ws,true');
      });
  });

  // FIXME: As above
  it.skip('starts and accepts requests, sending responses (HTTP & WS)', () => {
    server = new Server({ port: 9901, type: ['http', 'ws'] }, handlers); // eslint-disable-line

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
