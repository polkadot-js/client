// ISC, Copyright 2017-2018 Jaco Greeff

const pull = require('pull-stream');

const StatusMessage = require('./message/status');
// const rlpEncode = require('./rlp/encode');

const Peer = require('./peer');

describe('Peer', () => {
  const id = '0123456789';
  let peer;
  let peerInfo;

  beforeEach(() => {
    peerInfo = {
      id: {
        toB58String: () => id
      }
    };
    peer = new Peer(peerInfo);
  });

  it('stores the peerInfo id', () => {
    expect(
      peer.id
    ).toEqual(id);
    expect(
      peer.shortId
    ).toBeDefined();
  });

  it('stores the peerInfo', () => {
    expect(
      peer.peerInfo
    ).toEqual(peerInfo);
  });

  describe('hasStatus', () => {
    it('returns false when no status', () => {
      expect(
        peer.hasStatus
      ).toEqual(false);
    });

    it('returns true when status', () => {
      peer.status = {};

      expect(
        peer.hasStatus
      ).toEqual(true);
    });
  });

  describe('addConnection', () => {
    beforeEach(() => {
      peer._receive = jest.fn(() => true);
    });

    it('adds the connection', () => {
      peer.addConnection({});

      expect(peer.isConnected).toEqual(true);
    });

    it('receives using the new connection', () => {
      const conn = { some: { connection: '123' } };

      peer.addConnection(conn);

      expect(peer._receive).toHaveBeenCalledWith(conn);
    });
  });

  describe('_decodeMessage', () => {
    beforeEach(() => {
      peer.emit = jest.fn(() => true);
    });

    it('emits the decode message', (done) => {
      peer.emit = (type) => {
        expect(type).toEqual('message');
        done();
      };

      peer._decodeMessage(
        peer._encodeMessage(
          new StatusMessage()
        )
      );
    });
  });

  describe('_encodeMessage', () => {
    it('returns an encoded Buffer', () => {
      expect(
        Buffer.isBuffer(
          peer._encodeMessage(
            new StatusMessage()
          )
        )
      ).toEqual(true);
    });
  });

  describe('send', () => {
    beforeEach(() => {
      peer._receive = jest.fn(() => true);
      peer.addConnection({});
    });

    it('returns false when sending fails', () => {
      peer.pushable = null;

      expect(
        peer.send()
      ).toEqual(false);
    });

    it('returns true when sent', () => {
      expect(
        peer.send(new StatusMessage())
      ).toEqual(true);
    });
  });

  describe('_receive', () => {
    it('returns false when on error', () => {
      expect(
        peer.addConnection()
      ).toEqual(false);
    });

    it('returns true when no error', () => {
      expect(
        peer.addConnection(
          pull.through()
        )
      ).toEqual(true);
    });
  });
});
