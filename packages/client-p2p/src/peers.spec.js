// ISC, Copyright 2017 Jaco Greeff

const EventEmitter = require('eventemitter3');

const Peers = require('./peers');

describe('Peers', () => {
  const peer = {
    id: {
      toB58String: () => '1234567890'
    }
  };
  let emitter;
  let peers;

  beforeEach(() => {
    emitter = new EventEmitter();
    peers = new Peers(emitter);
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

  it('ignores invalid discovery', () => {
    emitter.emit('peer:discovery');

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('adds the peer when discovered', () => {
    emitter.emit('peer:discovery', peer);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(0);
  });

  it('emits "discovered" when peer found', (done) => {
    peers.on('discovered', () => done());

    emitter.emit('peer:discovery', peer);
  });

  it('does not add when re-discovered (connecting)', () => {
    emitter.emit('peer:discovery', peer);
    peers.get(0).isConnecting = true;
    emitter.emit('peer:discovery', peer);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(0);
  });

  it('does not add when re-discovered (connected)', () => {
    emitter.emit('peer:discovery', peer);
    peers.get(0).isConnected = true;
    emitter.emit('peer:discovery', peer);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(1);
  });

  it('ignores invalid connection', () => {
    emitter.emit('peer:connect');

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('ignores the peer when connected, but not discovered', () => {
    emitter.emit('peer:connect', peer);

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('connects the peer when connected and discovered', () => {
    emitter.emit('peer:discovery', peer);
    emitter.emit('peer:connect', peer);

    expect(peers.count).toEqual(1);
    expect(peers.connectedCount).toEqual(1);
  });

  it('emits "connected" when peer connected', (done) => {
    peers.on('connected', () => done());

    emitter.emit('peer:discovery', peer);
    emitter.emit('peer:connect', peer);
  });

  it('ignores invalid disconnection', () => {
    emitter.emit('peer:disconnect');

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('ignores disconnection when peer is not discovered', () => {
    emitter.emit('peer:disconnect', peer);

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('disconnects the peer when connected and discovered', () => {
    emitter.emit('peer:discovery', peer);
    emitter.emit('peer:connect', peer);
    emitter.emit('peer:disconnect', peer);

    expect(peers.count).toEqual(0);
    expect(peers.connectedCount).toEqual(0);
  });

  it('emits "disconnected" when peer disconnected', (done) => {
    peers.on('disconnected', () => done());

    emitter.emit('peer:discovery', peer);
    emitter.emit('peer:connect', peer);
    emitter.emit('peer:disconnect', peer);
  });
});
