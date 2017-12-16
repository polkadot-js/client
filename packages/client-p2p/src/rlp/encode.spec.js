// ISC, Copyright 2017 Jaco Greeff

const StatusMessage = require('../message/status');
const rlpEncode = require('./encode');

describe('rlpEncode', () => {
  let message;

  beforeEach(() => {
    message = new StatusMessage();
  });

  it('throws when message not provided', () => {
    expect(
      () => rlpEncode()
    ).toThrow(/valid message/);
  });

  it('returns an encoded Buffer', () => {
    expect(
      Buffer.isBuffer(
        rlpEncode(message)
      )
    ).toEqual(true);
  });
});
