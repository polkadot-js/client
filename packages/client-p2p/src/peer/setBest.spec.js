// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Peer from '.';

describe('setBest', () => {
  let peer;

  beforeEach(() => {
    peer = new Peer({}, {}, null, {
      id: {
        toB58String: () => '0x1234'
      }
    });
  });

  it('sets the number & hash', () => {
    peer.setBest('number', 'hash');

    expect(peer.bestHash).toEqual('hash');
    expect(peer.bestNumber).toEqual('number');
  });
});
