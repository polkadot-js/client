// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createPeer = require('./index');

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
    peer = createPeer(peerInfo);
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
