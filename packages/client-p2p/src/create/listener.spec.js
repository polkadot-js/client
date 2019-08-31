// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import PeerInfo from 'peer-info';

import createListener from './listener';

describe('createListener', () => {
  let origPeerInfoCreate;
  let peerInfoMock;

  beforeEach(() => {
    peerInfoMock = {
      id: {
        toB58String: () => '<someid>'
      },
      multiaddrs: {
        add: jest.fn()
      }
    };

    // eslint-disable-next-line @typescript-eslint/unbound-method
    origPeerInfoCreate = PeerInfo.create;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    PeerInfo.create = jest.fn((callback) => {
      callback(null, peerInfoMock);
    });
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    PeerInfo.create = origPeerInfoCreate;
  });

  it('validates the IP address', () => {
    return createListener('nodejs', 'no.ip.is.here').catch((error) => {
      expect(error.message).toMatch(/IP address/);
    });
  });

  it('returns the created PeerInfo instance', async () => {
    const peerInfo = await createListener('nodejs', { address: '127.0.0.1', port: 7788 });

    expect(
      peerInfo
    ).toEqual(peerInfoMock);
  });

  it('fails when PeerInfo.create fails', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    PeerInfo.create = (cb) => cb(new Error('test create failure'));

    return createListener('nodejs', { address: '127.0.0.1', port: 7788 }).catch((error) => {
      expect(error.message).toMatch(/test create failure/);
    });
  });

  describe('IPv4', () => {
    beforeEach(async () => {
      await createListener('nodejs', { address: '10.12.34.67', port: 7788 });
    });

    it('adds tcp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip4/10.12.34.67/tcp/7788/p2p/<someid>');
    });
  });

  describe('IPv6', () => {
    beforeEach(async () => {
      await createListener('nodejs', { address: '2:3:4:5:6:7:8:9', port: 6677 });
    });

    it('adds tcp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip6/2:3:4:5:6:7:8:9/tcp/6677/p2p/<someid>');
    });
  });
});
