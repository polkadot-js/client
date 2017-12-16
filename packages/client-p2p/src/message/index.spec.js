// ISC, Copyright 2017 Jaco Greeff

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const StatusMessage = require('./status');
const message = require('./index');

describe('message', () => {
  it('expects a numeric id', () => {
    expect(
      () => message()
    ).toThrow(/numeric id/);
  });

  it('throws when class is not found', () => {
    expect(
      () => message(666)
    ).toThrow(/No message found/);
  });

  it('returns an instance of the message', () => {
    expect(
      isInstanceOf(
        message(0),
        StatusMessage
      )
    ).toEqual(true);
  });
});
