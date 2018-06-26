// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import logger from '@polkadot/util/logger';

import logPeer from './logPeer';

const l = logger('test');

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
