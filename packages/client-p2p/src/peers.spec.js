// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const Peers = require('./peers');

describe('Peers', () => {
  const connection = {
    toString: () => '123'
  };
  const peerInfo = {
    id: {
      toB58String: () => '1234567890'
    },
    isConnected: () => connection
  };
  let node;
  let peers;

  beforeEach(() => {
    node = new EventEmitter();
    peers = new Peers(node);
  });

  it('creates an instance', () => {
    expect(
      peers
    ).toBeDefined();
  });

  it('starts with 0 peers, none connected', () => {
    expect(peers.count).toEqual(0);
    expect(peers.peers).toHaveLength(0);
  });

  describe('_onConnect', () => {
    it('ignores invalid connections', () => {
      expect(
        peers._onConnect()
      ).toEqual(false);
    });

    it('ignores non-existing peers', () => {
      expect(
        peers._onConnect(peerInfo)
      ).toEqual(false);
    });

    it('emits connected event', (done) => {
      peers.add(peerInfo);
      peers.on('connected', () => {
        done();
      });
      peers._onConnect(peerInfo);
    });
  });

  describe('_onDisconnect', () => {
    it('ignores invalid connections', () => {
      expect(
        peers._onDisconnect()
      ).toEqual(false);
    });

    it('ignores non-existing peers', () => {
      expect(
        peers._onDisconnect(peerInfo)
      ).toEqual(false);
    });

    it('emits the disconnected event', (done) => {
      peers.add(peerInfo);
      peers.on('disconnected', () => {
        done();
      });
      peers._onDisconnect(peerInfo);
    });

    it('removes the peer', () => {
      peers.add(peerInfo);
      peers._onDisconnect(peerInfo);
      expect(peers._peers).toEqual({});
    });
  });

  describe('_onDiscovery', () => {
    it('ignores invalid connections', () => {
      expect(
        peers._onDiscovery()
      ).toEqual(false);
    });

    it('ignores already-existing peers', () => {
      peers.add(peerInfo);
      expect(
        peers._onDiscovery(peerInfo)
      ).toEqual(false);
    });

    it('adds the peer', () => {
      peers.add = jest.fn(() => true);
      peers._onDiscovery(peerInfo);

      expect(
        peers.add
      ).toHaveBeenCalledWith(peerInfo);
    });
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

      expect(peers.count).toEqual(1);
    });

    it('does not re-add a peer', () => {
      peers.add(peerInfo);
      peers.add(peerInfo);

      expect(peers.count).toEqual(1);
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
