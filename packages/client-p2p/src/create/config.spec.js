// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const promisify = require('@polkadot/util/promisify');
const Railing = require('libp2p-railing');
const PeerInfo = require('peer-info');

const createConfig = require('./config');

describe('createConfig', () => {
  let peerInfo;

  beforeEach(async () => {
    peerInfo = await promisify(null, PeerInfo.create, { bits: 0 });
  });

  it('expects a peerInfo object', () => {
    expect(
      () => createConfig()
    ).toThrow(/PeerInfo instance/);
  });

  it('expects a valid bootNodes array', () => {
    expect(
      () => createConfig(peerInfo, 'notanArray')
    ).toThrow(/array of bootNodes/);
  });

  it('returns a valid configuration object', () => {
    expect(
      createConfig(peerInfo)
    ).toBeDefined();
  });

  it('uses Railing when bootnodes available', () => {
    expect(
      isInstanceOf(
        createConfig(
          peerInfo, ['/ip4/127.0.0.1/tcp/6677']
        ).discovery[1],
        Railing
      )
    ).toEqual(true);
  });
});
