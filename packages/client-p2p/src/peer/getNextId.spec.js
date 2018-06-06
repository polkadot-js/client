// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const createPeer = require('./index');

describe('getNextId', () => {
  let peer;

  beforeEach(() => {
    peer = createPeer({}, {}, {
      id: {
        toB58String: () => '0x1234'
      }
    });
  });

  it('returns incrementing ids', () => {
    expect(peer.getNextId()).toEqual(1);
    expect(peer.getNextId()).toEqual(2);
  });
});
