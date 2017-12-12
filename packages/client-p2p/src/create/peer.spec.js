// ISC, Copyright 2017 Jaco Greeff

const PeerInfo = require('peer-info');

const createPeer = require('./peer');

describe('createPeer', () => {
  let origPeerInfoCreate;
  let peerInfoMock;

  beforeEach(() => {
    peerInfoMock = {
      multiaddrs: {
        add: jest.fn()
      }
    };

    origPeerInfoCreate = PeerInfo.create;
    PeerInfo.create = jest.fn((callback) => {
      callback(null, peerInfoMock);
    });
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
    await createPeer();

    expect(
      PeerInfo.create
    ).toHaveBeenCalled();
  });

  it('returns the created PeerInfo instance', async () => {
    const peerInfo = await createPeer();

    expect(
      peerInfo
    ).toEqual(peerInfoMock);
  });

  it('fails when PeerInfo.create fails', () => {
    PeerInfo.create = (cb) => cb(new Error('test create failure'));

    createPeer('127.0.0.1', 999).catch((error) => {
      expect(error.message).toMatch(/test create failure/);
    });
  });

  describe('IPv4', () => {
    beforeEach(async () => {
      await createPeer('10.12.34.67', 7788);
    });

    it('adds tcp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip4/10.12.34.67/tcp/7788');
    });

    it('adds udp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip4/10.12.34.67/udp/7788');
    });
  });

  describe('IPv6', () => {
    beforeEach(async () => {
      await createPeer('2:3:4:5:6:7:8:9', 6677);
    });

    it('adds tcp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip6/2:3:4:5:6:7:8:9/tcp/6677');
    });

    it('adds udp entry', () => {
      expect(
        peerInfoMock.multiaddrs.add
      ).toHaveBeenCalledWith('/ip6/2:3:4:5:6:7:8:9/udp/6677');
    });
  });
});
