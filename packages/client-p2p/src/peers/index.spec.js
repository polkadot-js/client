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

  describe('add', () => {
    let peerInfo;

    beforeEach(() => {
      peerInfo = {
        id: {
          toB58String: () => '0x1234'
        }
      };
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

    // FIXME: peer doesn't have emit anymore, find a workaround?
    it.skip('emits message when peer receives', (done) => {
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
});
