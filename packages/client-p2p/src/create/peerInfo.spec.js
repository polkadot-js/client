// ISC, Copyright 2017 Jaco Greeff

const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createPeerInfo = require('./peerInfo');

describe('createPeerInfo', () => {
  const addresses = [
    '/ip4/127.0.0.1/tcp/8888',
    '/ip4/127.0.0.1/tcp/8899'
  ];
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

  it('expects address Array', () => {
    return createPeerInfo('notAddrArray').catch((error) => {
      expect(error.message).toMatch(/array of network addresses/);
    });
  });

  it('expects address values', () => {
    return createPeerInfo([]).catch((error) => {
      expect(error.message).toMatch(/one network address/);
    });
  });

  it('returns a valid PeerInfo instance', async () => {
    const peerInfo = await createPeerInfo(addresses);

    expect(
      isInstanceOf(peerInfo, PeerInfo)
    ).toEqual(true);
  });

  it('adds the provided addresses', async () => {
    const peerInfo = await createPeerInfo(addresses);

    expect(
      peerInfo.multiaddrs.has(addresses[0])
    ).toEqual(true);
    expect(
      peerInfo.multiaddrs.has(addresses[1])
    ).toEqual(true);
  });
});
