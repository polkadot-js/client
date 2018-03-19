// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');
const l = require('@polkadot/util/logger')('test');

const logPeer = require('./logPeer');

describe('logPeer', () => {
  let state;

  beforeEach(() => {
    state = {
      emitter: new EventEmitter(),
      l
    };
  });

  it('emits the peer event', (done) => {
    state.emitter.on('test', (peer) => {
      expect(peer).toEqual({ shortId: 'peerTest' });

      done();
    });

    logPeer(state, 'test', { shortId: 'peerTest' });
  });
});
