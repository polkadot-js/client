// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Peer from './index';

describe('createPeer', () => {
  const id = '0123456789';
  let peer;
  let peerInfo;

  beforeEach(() => {
    peerInfo = {
      id: {
        toB58String: () => id
      }
    };
    peer = new Peer({}, {}, peerInfo);
  });

  it('stores the peerInfo id', () => {
    expect(
      peer.id
    ).toEqual(id);
    expect(
      peer.shortId
    ).toBeDefined();
  });

  it('stores the peerInfo', () => {
    expect(
      peer.peerInfo
    ).toEqual(peerInfo);
  });
});
