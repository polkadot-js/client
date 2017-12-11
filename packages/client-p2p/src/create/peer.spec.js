// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const PeerInfo = require('peer-info');

const createPeer = require('./peer');

describe('createPeer', () => {
  let origPeerInfoCreate;

  beforeEach(() => {
    origPeerInfoCreate = PeerInfo.create;
  });

  afterEach(() => {
    PeerInfo.create = origPeerInfoCreate;
  });

  it('validates the IP address', () => {
    createPeer('no.ip.is.here').catch((error) => {
      expect(error.message).toMatch(/valid IP address/);
    });
  });

  it('validates the port', () => {
    createPeer('127.0.0.1', 'notAPort').catch((error) => {
      expect(error.message).toMatch(/valid numeric port/);
    });
  });

  it('creates using defaults', async () => {
    const peerInfo = await createPeer();

    expect(
      isInstanceOf(peerInfo, PeerInfo)
    ).toEqual(true);
  });

  it('fails when PeerInfo.create fails', () => {
    PeerInfo.create = (cb) => cb(new Error('test create failure'));

    createPeer('127.0.0.1', 999).catch((error) => {
      expect(error.message).toMatch(/test create failure/);
    });
  });

  describe('IPv4', () => {
    let peerInfo;

    beforeEach(async () => {
      peerInfo = await createPeer('10.12.34.67', 7788);
    });

    it('adds tcp entry', () => {
      expect(
        peerInfo.multiaddrs.has('/ip4/10.12.34.67/tcp/7788')
      ).toEqual(true);
    });

    it('adds udp entry', () => {
      expect(
        peerInfo.multiaddrs.has('/ip4/10.12.34.67/udp/7788')
      ).toEqual(true);
    });
  });

  describe('IPv6', () => {
    let peerInfo;

    beforeEach(async () => {
      peerInfo = await createPeer('2:3:4:5:6:7:8:9', 6677);
    });

    it('adds tcp entry', () => {
      expect(
        peerInfo.multiaddrs.has('/ip6/2:3:4:5:6:7:8:9/tcp/6677')
      ).toEqual(true);
    });

    it('adds udp entry', () => {
      expect(
        peerInfo.multiaddrs.has('/ip6/2:3:4:5:6:7:8:9/udp/6677')
      ).toEqual(true);
    });
  });
});
