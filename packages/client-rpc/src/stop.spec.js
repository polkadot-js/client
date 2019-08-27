// Copyright 2017-2019 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Rpc from '.';

describe('stop', () => {
  let server;

  beforeEach(() => {
    const config = {
      rpc: {
        port: 9901,
        path: '/',
        types: ['http']
      }
    };
    const chain = {
      chain: {
        name: 'test'
      },
      state: {}
    };

    server = new Rpc(config, chain);
    server.servers = [{
      close: () => true
    }];
  });

  it('returns false when internal server not started', () => {
    server.servers = [];

    return server.stop().then((result) => {
      expect(result).toEqual(false);
    });
  });

  it('calls stop() on the internal server', (done) => {
    server.servers = [{
      close: () => {
        expect(server.servers).toEqual([]);
        done();
      }
    }];

    server.stop();
  });

  it('returns true when completed', () => {
    return server.stop().then((result) => {
      expect(result).toEqual(true);
    });
  });
});
