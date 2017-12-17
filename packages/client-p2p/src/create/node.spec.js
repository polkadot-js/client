// ISC, Copyright 2017 Jaco Greeff

const LibP2P = require('libp2p');
const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createNode = require('./node');

describe('createNode', () => {
  let origPeerInfoCreate;
  let count = 0;

  beforeEach(() => {
    origPeerInfoCreate = PeerInfo.create;
    PeerInfo.create = (callback) => {
      origPeerInfoCreate(new PeerId(Buffer.from([count++])), callback);
    };
  });

  afterEach(() => {
    PeerInfo.create = origPeerInfoCreate;
  });

  it('requires a valid address', () => {
    return createNode().catch((error) => {
      expect(error.message).toMatch(/IP address/);
    });
  });

  it('requires a valid port', () => {
    return createNode('127.0.0.1').catch((error) => {
      expect(error.message).toMatch(/numeric port/);
    });
  });

  it('requires a valid chain definition object', () => {
    return createNode('127.0.0.1', 36677).catch((error) => {
      expect(error.message).toMatch(/chain definition/);
    });
  });

  it('requires a valid peer array', () => {
    return createNode('127.0.0.1', 36677, {}, 'notArray').catch((error) => {
      expect(error.message).toMatch(/Expected peers/);
    });
  });

  it('creates a valid LibP2p instance', async () => {
    const libp2p = await createNode('127.0.0.1', 36789, {});

    expect(
      isInstanceOf(libp2p, LibP2P)
    ).toEqual(true);
  });
});
