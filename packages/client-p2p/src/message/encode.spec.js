// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isU8a = require('@polkadot/util/is/u8a');

const status = require('../message/status');
const encode = require('./encode');

describe('encode', () => {
  let message;

  beforeEach(() => {
    message = status({});
  });

  it('returns an encoded Uint8Array', () => {
    expect(
      isU8a(
        encode(message)
      )
    ).toEqual(true);
  });
});
