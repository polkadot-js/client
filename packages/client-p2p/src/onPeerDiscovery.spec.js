// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const onPeerDiscovery = require('./onPeerDiscovery');

describe('onPeerDiscovery', () => {
  let peer;
  let self;

  beforeEach(() => {
    self = {
      peers: new EventEmitter(),
      node: {
        dialProtocol: jest.fn((peerInfo, protocol, cb) => cb(null, 'connection'))
      }
    };
    peer = {
      id: '123456',
      shortId: '123456',
      peerInfo: 'peerInfo'
    };
  });

  it('dials the node', (done) => {
    peer.addConnection = () => {
      expect(self.node.dialProtocol).toHaveBeenCalled();

      done();
    };

    onPeerDiscovery(self);

    self.peers.emit('discovered', peer);
  });

  it('adds the peer connection', (done) => {
    peer.addConnection = (connection) => {
      expect(connection).toEqual('connection');

      done();
    };

    onPeerDiscovery(self);

    self.peers.emit('discovered', peer);
  });
});
