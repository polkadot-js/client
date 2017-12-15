// ISC, Copyright 2017 Jaco Greeff

const Server = require('./index');

describe('Server', () => {
  it('creates the instance', () => {
    expect(
      new Server({}, {}, false)
    ).toBeDefined();
  });

  describe('_receive', () => {
    let server;

    beforeEach(() => {
      server = new Server({}, {}, false);
    });

    it('checks for a protocol match', () => {
      expect(
        () => server._receive()
      ).toThrow(/Expected matching protocol/);
    });
  });
});
