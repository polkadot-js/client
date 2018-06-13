// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const Railing = require('libp2p-railing');
const PeerInfo = require('peer-info');

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const promisify = require('@polkadot/util/promisify');

const createConfig = require('./config');

// FIXMe times out on CI
describe.skip('createConfig', () => {
  let peerInfo;

  beforeEach(async () => {
    peerInfo = await promisify(null, PeerInfo.create);
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

  it('does not Railing when no bootnodes', () => {
    expect(
      createConfig(peerInfo).discovery
    ).toHaveLength(1);
  });
});
