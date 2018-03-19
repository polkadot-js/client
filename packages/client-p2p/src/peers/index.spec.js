// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const createPeers = require('./index');

describe('Peers', () => {
  let node;
  let peers;

  beforeEach(() => {
    node = new EventEmitter();
    peers = createPeers(node);
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
