// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const LibP2P = require('libp2p');

const createNode = require('./node');

describe('createNode', () => {
  it('requires a valid config object', () => {
    return createNode().catch((error) => {
      expect(error.message).toMatch(/valid p2p config/);
    });
  });

  it('requires a valid chain definition object', () => {
    return createNode({}).catch((error) => {
      expect(error.message).toMatch(/valid chain/);
    });
  });

  it('creates a valid LibP2p instance', async () => {
    const libp2p = await createNode({ address: '127.0.0.1', port: 6789 }, { nodes: [] }, []);

    expect(
      isInstanceOf(libp2p, LibP2P)
    ).toEqual(true);
  });
});
