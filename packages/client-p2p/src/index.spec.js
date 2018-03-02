// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const StatusMessage = require('./message/status');
const defaults = require('./defaults');
const Server = require('./index');

describe('Server', () => {
  let config;
  let chain;
  let origPeerInfoCreate;
  let count = 0;
  let server;

  beforeEach(() => {
    config = {
      roles: ['none'],
      p2p: {
        address: '127.0.0.1',
        port: 36677,
        peers: []
      }
    };
    chain = {
      blocks: {
        getLatestHash: jest.fn(() => new Uint8Array([1, 2, 3, 4, 5])),
        getLatestNumber: jest.fn(() => 12345)
      },
      config: {},
      genesis: {
        hash: '0x1234'
      }
    };

    origPeerInfoCreate = PeerInfo.create;
    PeerInfo.create = (callback) => {
      origPeerInfoCreate(new PeerId(Buffer.from([count++])), callback);
    };
    server = new Server(config, chain, false);
  });

  afterEach(() => {
    PeerInfo.create = origPeerInfoCreate;

    return server.stop();
  });

  it('creates the instance', () => {
    expect(
      server
    ).toBeDefined();
  });

  describe('peers', () => {
    it('returns the peers via .peers', () => {
      server._peers = { 'peers': 'something' };

      expect(
        server.peers
      ).toEqual(server._peers);
    });
  });

  describe('isStarted', () => {
    it('returns the started status (false)', () => {
      expect(
        server.isStarted
      ).toEqual(false);
    });

    it('returns the started status (true)', () => {
      return server.start().then(() => {
        expect(
          server.isStarted
        ).toEqual(true);
      });
    });
  });

  describe('start', () => {
    let stopSpy;

    beforeEach(() => {
      stopSpy = jest.spyOn(server, 'stop');
    });

    it('stops any started servers', () => {
      return server.start().then(() => {
        expect(stopSpy).toHaveBeenCalled();
      });
    });

    it('returns true when started', () => {
      return server.start().then((result) => {
        expect(result).toEqual(true);
      });
    });

    it('emits the started event', (done) => {
      server.on('started', () => {
        done();
      });

      server.start();
    });
  });

  describe('stop', () => {
    let stopSpy;

    beforeEach(() => {
      stopSpy = jest.fn((cb) => cb());
      server._peers = {};
      server._node = {
        stop: stopSpy
      };
    });

    afterEach(() => {
      server._node = null;
    });

    it('calls stop() on the internal server', () => {
      return server.stop().then(() => {
        expect(stopSpy).toHaveBeenCalled();
      });
    });

    it('resets the connected peers', () => {
      return server.stop().then(() => {
        expect(server._peers).toEqual(null);
      });
    });

    it('resets the server', () => {
      return server.stop().then(() => {
        expect(server._node).toEqual(null);
      });
    });

    it('emits the stopped event', (done) => {
      server.on('stopped', () => {
        done();
      });

      server.stop();
    });

    it('returns true when completed', () => {
      return server.stop().then((result) => {
        expect(result).toEqual(true);
      });
    });

    it('returns false when internal server not started', () => {
      server._node = null;

      return server.stop().then((result) => {
        expect(result).toEqual(false);
      });
    });
  });

  describe('_onMessage', () => {
    let peer;
    let status;

    beforeEach(() => {
      peer = {
        id: '123456',
        shortId: '123456',
        setStatus: jest.fn()
      };
      status = new StatusMessage();

      server._sendStatus = jest.fn(() => true);
    });

    it('emits the message as received', (done) => {
      server.on('message', ({ peer, message }) => {
        expect(message).toEqual(status);
        done();
      });

      server._onMessage({ peer, message: status });
    });

    it('add status to peer status is received', () => {
      server._onMessage({ peer, message: status });

      expect(peer.setStatus).toHaveBeenCalledWith(status);
    });

    it('does not add status to peer non-status is received', () => {
      server._onMessage({ peer, message: { id: 666 } });

      expect(peer.setStatus).not.toHaveBeenCalled();
    });
  });

  describe('_onPeerConnected', () => {
    let peer;

    beforeEach(() => {
      peer = { id: '123456', shortId: '123456' };

      server._sendStatus = jest.fn(() => true);
    });

    it('send status when connection received', () => {
      server._onPeerConnected(peer);

      expect(server._sendStatus).toHaveBeenCalledWith(peer);
    });
  });

  describe('_onPeerDiscovery', () => {
    let connection;
    let peerInfo;
    let peer;

    beforeEach(() => {
      connection = { some: 'connection' };
      peerInfo = { peer: 'info' };
      peer = { id: '123456', shortId: '123456', peerInfo, addConnection: jest.fn(() => true) };
      server._node = {
        dial: jest.fn((peerInfo, protocol, cb) => cb(null, connection))
      };
    });

    afterEach(() => {
      server._node = null;
    });

    it('returns true on success', () => {
      return server._onPeerDiscovery(peer).then((result) => {
        expect(result).toEqual(true);
      });
    });

    it('returns false on failure', () => {
      peer.addConnection = () => {
        throw new Error('error');
      };

      return server._onPeerDiscovery(peer).then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('dials the peer', () => {
      return server._onPeerDiscovery(peer).then(() => {
        expect(
          server._node.dial
        ).toHaveBeenCalledWith(peerInfo, defaults.PROTOCOL, expect.anything());
      });
    });

    it('adds the connection to the peer', () => {
      return server._onPeerDiscovery(peer).then(() => {
        expect(
          peer.addConnection
        ).toHaveBeenCalledWith(connection);
      });
    });
  });

  describe('_sendStatus', () => {
    let peer;

    beforeEach(() => {
      peer = {
        send: jest.fn(() => 'testResult')
      };
    });

    it('calls into peer send', () => {
      server._sendStatus(peer);

      expect(
        peer.send
      ).toHaveBeenCalled();
    });

    it('returns result from peer send', () => {
      expect(
        server._sendStatus(peer)
      ).toEqual('testResult');
    });
  });

  describe('_onProtocol', () => {
    let connection;
    let peer;
    let peerInfo;

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
      server._peers = {
        add: jest.fn(() => peer)
      };
      server._receive = jest.fn((peer) => true);

      return server._onProtocol(defaults.PROTOCOL, connection);
    });

    it('retrieves the peerInfo', () => {
      expect(connection.getPeerInfo).toHaveBeenCalled();
    });

    it('adds the peer', () => {
      expect(server._peers.add).toHaveBeenCalledWith(peerInfo);
    });

    it('adds the peer connection', () => {
      expect(peer.addConnection).toHaveBeenCalledWith(connection);
    });
  });
});
