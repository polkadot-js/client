// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const StatusMessage = require('../message/status');
const onPeerConnected = require('./onPeerConnected');

describe('onPeerConnected', () => {
  let peer;
  let self;

  beforeEach(() => {
    self = {
      peers: new EventEmitter(),
      config: { roles: [] },
      chain: {
        blocks: {
          getLatestNumber: jest.fn(() => 123),
          getLatestHash: jest.fn(() => new Uint8Array([]))
        },
        genesis: {
          hash: new Uint8Array([])
        }
      }
    };
    peer = {
      id: '123456',
      shortId: '123456'
    };
  });

  it('send status when connection received', (done) => {
    peer.send = (message) => {
      expect(message.id).toEqual(StatusMessage.MESSAGE_ID);

      done();
    };

    onPeerConnected(self);

    self.peers.emit('connected', peer);
  });
});
