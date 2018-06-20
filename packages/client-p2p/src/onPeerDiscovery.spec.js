// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';
import logger from '@polkadot/util/logger';

import onPeerDiscovery from './onPeerDiscovery';

const l = logger('test');

describe('onPeerDiscovery', () => {
  let peer;
  let self;

  beforeEach(() => {
    self = {
      l,
      peers: new EventEmitter(),
      node: {
        dialProtocol: jest.fn((peerInfo, protocol, cb) => cb(null, 'connection')),
        isStarted: () => true,
        on: () => {}
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
