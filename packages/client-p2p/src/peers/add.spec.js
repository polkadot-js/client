// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const mockCreateEE = () => new EventEmitter();

jest.mock('../peer', () => mockCreateEE);

const createPeers = require('./index');

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
    peers = createPeers({ node });
  });

  it('adds the peer', () => {
    peers.add(peerInfo);

    expect(peers.count()).toEqual(1);
  });

  it('does not re-add a peer', () => {
    peers.add(peerInfo);
    peers.add(peerInfo);

    expect(peers.count()).toEqual(1);
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
