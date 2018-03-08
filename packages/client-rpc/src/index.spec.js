// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const ExtError = require('@polkadot/util/ext/error');
const HttpProvider = require('@polkadot/api-provider/http');
const WsProvider = require('@polkadot/api-provider/ws');

const createServer = require('./index');

describe('server', () => {
  let config;
  let server;
  let handlers;
  let testSpy;

  beforeEach(() => {
    config = {
      rpc: {
        port: 9901,
        path: '/',
        types: ['http']
      }
    };
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

  it('starts and accepts requests, sending responses (HTTP)', () => {
    server = createServer(config, {}, handlers); // eslint-disable-line

    return new HttpProvider('http://localhost:9901')
      .send('echo', [1, 'http', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,http,true');
      });
  });

  it.skip('starts and accepts requests, sending responses (WS)', () => {
    config.rpc.types = ['ws'];
    server = new Server(config, {}, handlers); // eslint-disable-line

    return new WsProvider('ws://localhost:9901')
      .send('echo', [1, 'ws', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,ws,true');
      });
  });

  it.skip('starts and accepts requests, sending responses (HTTP & WS)', () => {
    config.rpc.types = ['http', 'ws'];
    server = new Server(config, {}, handlers); // eslint-disable-line

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
