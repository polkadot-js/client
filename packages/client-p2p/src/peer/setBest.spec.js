// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import createPeer from './index';

describe('setBest', () => {
  let peer;

  beforeEach(() => {
    peer = createPeer({}, {}, {
      id: {
        toB58String: () => '0x1234'
      }
    });
  });

  it('sets the number & hash', () => {
    peer.setBest('number', 'hash');

    expect(peer.getBestHash()).toEqual('hash');
    expect(peer.getBestNumber()).toEqual('number');
  });
});
