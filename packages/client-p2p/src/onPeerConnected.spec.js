// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');
const l = require('@polkadot/util/logger')('test');

const StatusMessage = require('./message/status');
const onPeerConnected = require('./onPeerConnected');

describe('onPeerConnected', () => {
  let peer;
  let self;

  beforeEach(() => {
    self = {
      l,
      peers: new EventEmitter(),
      config: { roles: [] },
      chain: {
        blocks: {
          bestNumber: { get: jest.fn(() => 123) },
          bestHash: { get: jest.fn(() => new Uint8Array([])) }
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
      expect(message.type).toEqual(StatusMessage.TYPE);

      done();
    };

    onPeerConnected(self);

    self.peers.emit('connected', peer);
  });
});
