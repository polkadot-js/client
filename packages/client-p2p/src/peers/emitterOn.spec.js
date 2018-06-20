// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';

import emitterOn from './emitterOn';

describe('emitterOn', () => {
  let self;

  beforeEach(() => {
    self = {
      emitter: new EventEmitter()
    };
  });

  it('wraps event emitter handlers', (done) => {
    emitterOn(self)('connect', (peer) => {
      expect(peer).toEqual('peer');

      done();
    });

    self.emitter.emit('connect', 'peer');
  });
});
