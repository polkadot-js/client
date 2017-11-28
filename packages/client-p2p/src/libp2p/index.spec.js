// ISC, Copyright 2017 Jaco Greeff

const LibP2p = require('./index');

describe('LibP2p', () => {
  describe('constructor', () => {
    it('throws an exception', () => {
      expect(
        () => new LibP2p()
      ).toThrow();
    });
  });
});
