// ISC, Copyright 2017 Jaco Greeff

/* global jest */

const ExtError = require('@polkadot/util/ext/error');
const HttpProvider = require('@polkadot/api-provider/http');

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
    }
  });

  describe('constructor', () => {
    it('throws when non-numeric port is specified', () => {
      expect(
        () => new Server({ port: 'abc' })
      ).toThrow(/non-numeric port='abc'/);
    });

    it('throws when handlers are undefined', () => {
      expect(
        () => new Server({ port: 9901 })
      ).toThrow(/without handlers/);
    });

    it('throws when handlers are empty', () => {
      expect(
        () => new Server({ port: 9901 }, {})
      ).toThrow(/without handlers/);
    });

    it('throws when non-function handlers are found', () => {
      expect(
        () => new Server({ port: 9901 }, {
          'brokenA': true,
          'working': () => true,
          'brokenB': 'handler?'
        })
      ).toThrow(/Invalid method handlers found: 'brokenA', 'brokenB'/);
    });
  });

  describe('_handlePost', () => {
    beforeEach(() => {
      server = new Server({ port: 9901 }, handlers, false);
    });

    describe('jsonrpc', () => {
      it('fails when jsonrpc !== 2.0', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '1.0'
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            error: {
              code: ExtError.CODES.INVALID_JSONRPC,
              message: "Invalid jsonrpc field, expected '2.0', got '1.0'"
            }
          });
        });
      });

      it('fails when id is not defined', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '2.0'
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            error: {
              code: ExtError.CODES.INVALID_JSONRPC,
              message: "Expected a numeric id, got 'undefined'"
            }
          });
        });
      });

      it('fails when id is non-numeric', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '2.0',
              id: 'someId'
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            error: {
              code: ExtError.CODES.INVALID_JSONRPC,
              message: "Expected a numeric id, got 'someId'"
            }
          });
        });
      });
    });

    describe('handlers', () => {
      it('fails when no handler has been defined', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '2.0',
              id: 1,
              method: 'noSuchThing'
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            error: {
              code: ExtError.CODES.METHOD_NOT_FOUND,
              message: "Method 'noSuchThing' not found"
            }
          });
        });
      });

      it('calls the handler when defined', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '2.0',
              id: 1,
              method: 'test',
              params: ['a', 'b']
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(testSpy).toHaveBeenCalledWith(['a', 'b']);
        });
      });

      it('fails when handler throws an error', () => {
        const ctx = {
          request: {
            body: {
              id: 1,
              jsonrpc: '2.0',
              method: 'errorThrow',
              params: []
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            error: {
              code: ExtError.CODES.UNKNOWN,
              message: 'errorThrow'
            }
          });
        });
      });

      it('fails when handler returns an error', () => {
        const ctx = {
          request: {
            body: {
              id: 1,
              jsonrpc: '2.0',
              method: 'errorRet',
              params: []
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            id: 1,
            error: {
              code: ExtError.CODES.UNKNOWN,
              message: 'errorRet'
            }
          });
        });
      });

      it('succeeds with valid result', () => {
        const ctx = {
          request: {
            body: {
              jsonrpc: '2.0',
              id: 1,
              method: 'test',
              params: ['a', 'b']
            }
          }
        };

        return server._handlePost(ctx).then(() => {
          expect(ctx.body).toMatchObject({
            id: 1,
            result: 'test'
          });
        });
      });
    });
  });

  it('starts and accepts requests, sending responses', () => {
    server = new Server({ port: 9901 }, handlers); // eslint-disable-line

    return new HttpProvider('http://localhost:9901')
      .send('echo', [1, 'string', false])
      .then((result) => {
        expect(result).toEqual('echo: 1,string,false');
      });
  });
});
