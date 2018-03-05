// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const status = require('../message/status');
const onPeerMessage = require('./onPeerMessage');

describe('onPeerMessage', () => {
  let peer;
  let self;

  beforeEach(() => {
    self = {
      emitter: new EventEmitter(),
      peers: new EventEmitter()
    };
    peer = {
      id: '123456',
      shortId: '123456'
    };
  });

  it('sets status when status received', (done) => {
    peer.setStatus = (message) => {
      expect(message.id).toEqual(status.MESSAGE_ID);

      done();
    };

    onPeerMessage(self);

    self.peers.emit('message', {
      peer,
      message: { id: status.MESSAGE_ID }
    });
  });

  it('it emits the received message', (done) => {
    self.emitter.on('message', ({ peer, message }) => {
      expect(message).toEqual('test');

      done();
    });

    onPeerMessage(self);

    self.peers.emit('message', {
      peer,
      message: 'test'
    });
  });
});
