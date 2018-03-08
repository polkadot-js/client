// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const defaults = require('./defaults');
const onProtocol = require('./onProtocol');

describe('onProtocol', () => {
  let connection;
  let peer;
  let peerInfo;
  let self;

  beforeEach(() => {
    peerInfo = {
      id: {
        toB58String: () => '0x00'
      }
    };
    connection = {
      getPeerInfo: jest.fn((cb) => {
        cb(null, peerInfo);
      })
    };
    peer = {
      addConnection: jest.fn(() => true)
    };
    self = {
      peers: {
        add: jest.fn(() => peer)
      }
    };

    return onProtocol(self)(defaults.PROTOCOL, connection);
  });

  it('retrieves the peerInfo', () => {
    expect(connection.getPeerInfo).toHaveBeenCalled();
  });

  it('adds the peer', () => {
    expect(self.peers.add).toHaveBeenCalledWith(peerInfo);
  });

  it('adds the peer connection', () => {
    expect(peer.addConnection).toHaveBeenCalledWith(connection);
  });
});
