// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import Peer from './index';

describe('getNextId', () => {
  let peer;

  beforeEach(() => {
    peer = new Peer({}, {}, {
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
