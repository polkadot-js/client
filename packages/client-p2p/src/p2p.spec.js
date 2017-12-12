// ISC, Copyright 2017 Jaco Greeff

const P2p = require('./index');

describe('P2p', () => {
  describe('constructor', () => {
    it('creates the instance', () => {
      expect(new P2p({}, {})).toBeDefined();
    });
  });
});
