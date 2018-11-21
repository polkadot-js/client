// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Bootstrap from 'libp2p-bootstrap';
import PeerInfo from 'peer-info';

import { isInstanceOf, promisify } from '@polkadot/util';

import createConfig from './modules';

// FIXMe times out on CI
describe.skip('createModules', () => {
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
        Bootstrap
      )
    ).toEqual(true);
  });

  it('does not Railing when no bootnodes', () => {
    expect(
      createConfig(peerInfo).discovery
    ).toHaveLength(1);
  });
});
