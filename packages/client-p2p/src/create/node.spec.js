// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const LibP2P = require('libp2p');
const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const createNode = require('./node');

describe('createNode', () => {
  let origPeerInfoCreate;

  beforeEach(() => {
    origPeerInfoCreate = PeerInfo.create;
    PeerInfo.create = (callback) => {
      origPeerInfoCreate(new PeerId(Buffer.from([])), callback);
    };
  });

  afterEach(() => {
    PeerInfo.create = origPeerInfoCreate;
  });

  it('requires a valid config object', () => {
    return createNode().catch((error) => {
      expect(error.message).toMatch(/P2P configuration/);
    });
  });

  it('requires a valid chain definition object', () => {
    return createNode({}).catch((error) => {
      expect(error.message).toMatch(/chain definition/);
    });
  });

  it('creates a valid LibP2p instance', async () => {
    const libp2p = await createNode({ address: '127.0.0.1', port: 6789 }, {});

    expect(
      isInstanceOf(libp2p, LibP2P)
    ).toEqual(true);
  });
});
