// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const StatusMessage = require('./status');
const message = require('./index');

describe('message', () => {
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
