// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EventEmitter from 'eventemitter3';

import Peers from '.';

describe('add', () => {
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

  it('adds the peer', () => {
    peers.add(peerInfo);

    expect(peers.countAll()).toEqual(1);
  });

  it('does not re-add a peer', () => {
    peers.add(peerInfo);
    peers.add(peerInfo);

    expect(peers.countAll()).toEqual(1);
  });

  it('emits message when peer receives', (done) => {
    const peer = peers.add(peerInfo);
    const message = { 'something': 'else' };

    peers.on('message', (info) => {
      expect(info).toEqual({
        peer,
        message
      });
      done();
    });

    peer.emit('message', message);
  });
});
