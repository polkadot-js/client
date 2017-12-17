// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const StatusMessage = require('./message/status');
const { streamReader, streamWriter } = require('./stream');
const { PROTOCOL } = require('./defaults');
const Server = require('./index');

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = new Server({}, {}, false);
  });

  it('expects a valid config', () => {
    expect(
      () => new Server()
    ).toThrow(/P2P configuration/);
  });

  it('expects a chain definition', () => {
    expect(
      () => new Server({})
    ).toThrow(/chain definition/);
  });

  it('creates the instance', () => {
    expect(
      new Server({}, {}, false)
    ).toBeDefined();
  });

  describe('start', () => {
  });

  describe('stop', () => {
  });

  describe('_dialPeer', () => {
    let connection;
    let peer;

    beforeEach(() => {
      connection = { 'some': 'connection' };
      peer = {
        isConnecting: false,
        peerInfo: 'peerInfo'
      };

      server._send = jest.fn(() => true);
      server._node = {
        dial: jest.fn((peerInfo, protocol, cb) => cb(null, connection))
      };
    });

    it('returns false when peer is not found', () => {
      return server._dialPeer().then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('returns false when peer isConnecting', () => {
      return server._dialPeer({ isConnecting: true }).then((result) => {
        expect(result).toEqual(false);
      });
    });

    it('returns true when completed', () => {
      return server._dialPeer(peer).then((result) => {
        expect(result).toEqual(true);
      });
    });

    it('returns false when error ocurred', () => {
      server._send = () => {
        throw new Error('error');
      };

      return server._dialPeer(peer).then((result) => {
        expect(peer.isConnecting).toEqual(false);
        expect(peer.isConnected).toEqual(false);
        expect(result).toEqual(false);
      });
    });

    it('dials the peer', () => {
      return server._dialPeer(peer).then((result) => {
        expect(server._node.dial).toHaveBeenCalledWith(
          peer.peerInfo, PROTOCOL, expect.anything()
        );
      });
    });

    it('sends the status to the peer', (done) => {
      server._send = (_connection, message) => {
        expect(connection).toEqual(connection);
        expect(
          isInstanceOf(message, StatusMessage)
        ).toEqual(true);
        done();
      };

      server._dialPeer(peer);
    });
  });

  describe('_handleMessage', () => {
    it('expects a valid message', () => {
      expect(
        () => server._handleMessage()
      ).toThrow(/valid message/);
    });

    it('emits the message as received', (done) => {
      const message = new StatusMessage();

      server.on('message', (_message) => {
        expect(_message).toEqual(message);
        done();
      });

      server._handleMessage(message);
    });
  });

  describe('_receive', () => {
    it('checks for a protocol match', () => {
      expect(
        () => server._receive()
      ).toThrow(/Expected matching protocol/);
    });

    it('expects a valid connection', () => {
      expect(
        () => server._receive(PROTOCOL)
      ).toThrow(/valid connection/);
    });

    it('reads the stream, handles the message', (done) => {
      const message = new StatusMessage();

      server.on('message', (_message) => {
        expect(JSON.stringify(_message)).toEqual(JSON.stringify(message));
        done();
      });

      server._receive(PROTOCOL, streamWriter(message));
    });
  });

  describe('_send', () => {
    it('expects a valid connection', () => {
      expect(
        () => server._send()
      ).toThrow(/valid connection/);
    });

    it('expects a valid message', () => {
      expect(
        () => server._send({})
      ).toThrow(/valid message/);
    });

    it('sends the message', (done) => {
      const message = new StatusMessage();

      server._send(streamReader((_message) => {
        expect(JSON.stringify(_message)).toEqual(JSON.stringify(message));
        done();
      }), message);
    });
  });
});
