// ISC, Copyright 2017 Jaco Greeff

const EventEmitter = require('eventemitter3');

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

  it('ignores invalid discovery', (done) => {
    peers.on('discovered', () => {
      expect(peers.count).toEqual(0);
      expect(peers.connectedCount).toEqual(0);

      done();
    });

    node.emit('peer:discovery');
  });

  it('emits "discovered" when peerInfo found', (done) => {
    peers.on('discovered', () => done());

    node.emit('peer:discovery', peerInfo);
  });

  it('adds the peerInfo when discovered', (done) => {
    peers.on('discovered', () => {
      expect(peers.count).toEqual(1);
      expect(peers.connectedCount).toEqual(0);

      done();
    });

    node.emit('peer:discovery', peerInfo);
  });

  it('does not add when re-discovered (connecting)', () => {
    node.emit('peer:discovery', peerInfo);
    peers.getIndex(0).isConnecting = true;
    node.emit('peer:discovery', peerInfo);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(0);
  });

  it('does not add when re-discovered (connected)', () => {
    node.emit('peer:discovery', peerInfo);
    peers.getIndex(0).isConnected = true;
    node.emit('peer:discovery', peerInfo);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(1);
  });

  it('ignores invalid connection', () => {
    node.emit('peer:connect');

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('ignores the peerInfo when connected, but not discovered', () => {
    node.emit('peer:connect', peerInfo);

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('connects the peerInfo when connected and discovered', (done) => {
    peers.on('discovery', () => {
      node.emit('peer:connect', peerInfo);
    });

    peers.on('connected', () => {
      expect(peers.count).toEqual(1);
      expect(peers.connectedCount).toEqual(1);

      done();
    });

    node.emit('peer:discovery', peerInfo);
  });

  it('emits "connected" when peerInfo connected', (done) => {
    peers.on('discovered', () => {
      node.emit('peer:connect', peerInfo);
    });

    peers.on('connected', () => done());

    node.emit('peer:discovery', peerInfo);
  });

  it('ignores invalid disconnection', () => {
    node.emit('peer:disconnect');

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('ignores disconnection when peerInfo is not discovered', () => {
    node.emit('peer:disconnect', peerInfo);

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('disconnects the peerInfo when connected and discovered', (done) => {
    peers.on('discovered', () => {
      node.emit('peer:connect', peerInfo);
    });
    peers.on('connected', () => {
      node.emit('peer:disconnect', peerInfo);
    });

    peers.on('disconnected', () => {
      expect(peers.count).toEqual(0);
      expect(peers.connectedCount).toEqual(0);

      done();
    });

    node.emit('peer:discovery', peerInfo);
  });

  it('emits "disconnected" when peerInfo disconnected', (done) => {
    peers.on('discovered', () => {
      node.emit('peer:connect', peerInfo);
    });
    peers.on('connected', () => {
      node.emit('peer:disconnect', peerInfo);
    });

    peers.on('disconnected', () => {
      done();
    });

    node.emit('peer:discovery', peerInfo);
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
  });
});
