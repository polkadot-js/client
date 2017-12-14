// ISC, Copyright 2017 Jaco Greeff

const Server = require('./index');

describe('Server', () => {
  describe('constructor', () => {
    it('creates the instance', () => {
      expect(
        new Server({}, {}, false)
      ).toBeDefined();
    });
  });
});
