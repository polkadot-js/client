// ISC, Copyright 2017 Jaco Greeff

const protocolHandler = require('./handler');

describe('protocolHandler', () => {
  it('checks for a protocol match', () => {
    expect(
      () => protocolHandler()
    ).toThrow(/Expected matching protocol/);
  });
});
