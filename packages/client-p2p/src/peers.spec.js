// ISC, Copyright 2017 Jaco Greeff

const EventEmitter = require('eventemitter3');

const defaults = require('./defaults');
const Peers = require('./peers');

describe('Peers', () => {
  const peerInfo = {
    id: {
      toB58String: () => '1234567890'
    }
  };
  let node;
  let peers;

  beforeEach(() => {
    node = new EventEmitter();
    node.dial = jest.fn((peerInfo, protocol, cb) => cb(null, {}));
    peers = new Peers(node);
  });

  it('creates an instance', () => {
    expect(
      peers
    ).toBeDefined();
  });

  it('starts with 0 peers, none connected', () => {
    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  describe('_onConnect', () => {
    it('ignores invalid connections', () => {
      expect(
        peers._onConnect()
      ).toEqual(false);
    });

    it('ignores non-existing peers', () => {
      expect(
        peers._onConnect(peerInfo)
      ).toEqual(false);
    });

    it('emits connected event', (done) => {
      peers.add(peerInfo);
      peers.on('connected', () => {
        done();
      });
      peers._onConnect(peerInfo);
    });
  });

  describe('_onDisconnect', () => {
    it('ignores invalid connections', () => {
      expect(
        peers._onDisconnect()
      ).toEqual(false);
    });

    it('ignores non-existing peers', () => {
      expect(
        peers._onDisconnect(peerInfo)
      ).toEqual(false);
    });

    it('emits the disconnected event', (done) => {
      peers.add(peerInfo);
      peers.on('disconnected', () => {
        done();
      });
      peers._onDisconnect(peerInfo);
    });

    it('removes the peer', () => {
      peers.add(peerInfo);
      peers._onDisconnect(peerInfo);
      expect(peers._peers).toEqual({});
    });
  });

  describe('_onDiscovery', () => {
    it('ignores invalid connections', () => {
      return peers._onDiscovery().then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('ignores already-existing peers', () => {
      peers.add(peerInfo);
      return peers._onDiscovery(peerInfo).then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('returns false when adding fails', () => {
      peers.add = () => {
        throw new Error('error');
      };

      return peers._onDiscovery(peerInfo).then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('dials the peer', () => {
      return peers._onDiscovery(peerInfo).then(() => {
        expect(node.dial).toHaveBeenCalledWith(
          peerInfo, defaults.PROTOCOL, expect.anything()
        );
      });
    });

    it('adds the peer', () => {
      peers.add = jest.fn(() => true);

      return peers._onDiscovery(peerInfo).then(() => {
        expect(peers.add).toHaveBeenCalledWith(peerInfo, {});
      });
    });
  });

  describe('add', () => {
    let peerInfo;
    let connection;

    beforeEach(() => {
      connection = { 'some': 'connection' };
      peerInfo = {
        id: {
          toB58String: () => '0x1234'
        }
      };
    });

    it('adds the peer', () => {
      peers.add(peerInfo, null);

      expect(peers.count).toEqual(1);
    });

    it('adds the peerInfo (connected)', () => {
      peers.add(peerInfo, connection);

      expect(peers.connectedCount).toEqual(1);
    });

    it('adds the peerInfo with new info', () => {
      peers.add(peerInfo, connection);
      peers.add(peerInfo, { second: 'connection' });

      expect(peers.getIndex(0)._connections).toHaveLength(2);
    });

    it('emits message when peer receives', (done) => {
      const peer = peers.add(peerInfo, connection);
      const message = { 'something': 'else' };

      peers.on('message', (info) => {
        expect(info).toEqual({
          peer,
          message
        });
        done();
      });

      peer.emit('message', message);
    });
  });
});
