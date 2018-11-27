// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';

import Peers from './index';

describe('Peers', () => {
  let node;
  let peers;

  beforeEach(() => {
    node = new EventEmitter();
    peers = new Peers({}, {}, node);
  });

  it('creates an instance', () => {
    expect(
      peers
    ).toBeDefined();
  });

  it('starts with 0 peers, none connected', () => {
    expect(peers.count()).toEqual(0);
    expect(peers.peers()).toHaveLength(0);
  });
});
