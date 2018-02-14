// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isU8a = require('@polkadot/util/is/uint8Array');

const StatusMessage = require('../message/status');
const rlpEncode = require('./encode');

describe('rlpEncode', () => {
  let message;

  beforeEach(() => {
    message = new StatusMessage();
  });

  it('returns an encoded Uint8Array', () => {
    expect(
      isU8a(
        rlpEncode(message)
      )
    ).toEqual(true);
  });
});
