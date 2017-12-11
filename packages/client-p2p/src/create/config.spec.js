// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const Railing = require('libp2p-railing');
const PeerInfo = require('peer-info');

const createConfig = require('./config');

describe('createConfig', () => {
  let peerInfo;

  beforeEach(async () => {
    peerInfo = await new Promise((resolve, reject) => {
      PeerInfo.create((error, peerInfo) => {
        if (error) {
          reject(error);
        } else {
          resolve(peerInfo);
        }
      });
    });
  });

  it('expects a peerInfo object', () => {
    expect(
      () => createConfig()
    ).toThrow(/peerInfo as a PeerInfo/);
  });

  it('expects a valid bootNodes array', () => {
    expect(
      () => createConfig(peerInfo, 'notanArray')
    ).toThrow(/array of nodes/);
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
          peerInfo, ['/ip4/12.7.0.0.1/tcp/6677']
        ).discovery[1],
        Railing
      )
    ).toEqual(true);
  });
});
