/* eslint-disable import/first */
// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ExtError } from '@polkadot/util';

const MockExtError = ExtError;

jest.mock('./handlers', () => () => ({
  errorThrow: () => {
    throw new Error('errorThrow');
  },
  errorThrowEx: () => {
    throw new MockExtError('errorThrowEx', -123);
  },
  errorRet: () => {
    return Promise.resolve(new Error('errorRet'));
  },
  errorRetEx: () => {
    return Promise.resolve(new MockExtError('errorRetEx', -456));
  },
  test: jest.fn(() => Promise.resolve('test')),
  echo: (...params) => Promise.resolve(`echo: ${params.join(', ')}`)
}));

import HttpProvider from '@polkadot/rpc-provider/http';
import WsProvider from '@polkadot/rpc-provider/ws';

import Rpc from '.';

describe('server', () => {
  let config;
  let chain;
  let server;
  let handlers;

  beforeEach(() => {
    chain = {
      blocks: {
        blockData: {
          onUpdate: () => {}
        }
      },
      state: {
      }
    };
    config = {
      rpc: {
        port: 9901,
        path: '/',
        types: ['http']
      }
    };
  });

  afterEach(() => {
    if (server) {
      server.stop();
      server = null;
    }
  });

  it('starts and accepts requests, sending responses (HTTP)', () => {
    server = new Rpc(config, chain);
    server.start(); // eslint-disable-line

    return new HttpProvider('http://localhost:9901')
      .send('echo', [1, 'http', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,http,true');
      });
  });

  it.skip('starts and accepts requests, sending responses (WS)', () => {
    config.rpc.types = ['ws'];
    server = new Rpc(config, {}, handlers); // eslint-disable-line

    return new WsProvider('ws://localhost:9901')
      .send('echo', [1, 'ws', true])
      .then((result) => {
        expect(result).toEqual('echo: 1,ws,true');
      });
  });

  it.skip('starts and accepts requests, sending responses (HTTP & WS)', () => {
    config.rpc.types = ['http', 'ws'];
    server = new Rpc(config, {}, handlers); // eslint-disable-line

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
