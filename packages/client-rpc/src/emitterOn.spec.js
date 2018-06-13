// Copyright 2017-2018 @polkadot/client-rpc authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const emitterOn = require('./emitterOn');

describe('emitterOn', () => {
  let self;

  beforeEach(() => {
    self = {
      emitter: new EventEmitter()
    };
  });

  it('wraps event emitter handlers', (done) => {
    emitterOn(self)('event', () => {
      done();
    });

    self.emitter.emit('event');
  });
});
