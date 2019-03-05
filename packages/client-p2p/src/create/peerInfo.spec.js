// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import PeerId from 'peer-id';
import PeerInfo from 'peer-info';
import { isInstanceOf } from '@polkadot/util';

import createPeerInfo from './peerInfo';

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
