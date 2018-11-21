// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';

import Peers from './index';

describe('get', () => {
  let node;
  let peers;
  let peerInfo;

  beforeEach(() => {
    peerInfo = {
      id: {
        toB58String: () => '0x1234'
      }
    };
    node = new EventEmitter();
    peers = new Peers({}, {}, node);
  });

  it('returns undefined for non-existing peer', () => {
    expect(peers.get(peerInfo)).not.toBeDefined();
  });

  it('returns the added pair', () => {
    peers.add(peerInfo);

    expect(peers.get(peerInfo)).toBeDefined();
  });
});
