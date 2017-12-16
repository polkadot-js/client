// ISC, Copyright 2017 Jaco Greeff

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
  });

  describe('_receive', () => {
    it('checks for a protocol match', () => {
      expect(
        () => server._receive()
      ).toThrow(/Expected matching protocol/);
    });

    it('expects a valid connection', () => {
      expect(
        () => server._receive('/dot/0.0.0')
      ).toThrow(/valid connection/);
    });
  });

  describe('_handleMessage', () => {
    it('expects a valid message', () => {
      expect(
        () => server._handleMessage()
      ).toThrow(/valid message/);
    });
  });
});
