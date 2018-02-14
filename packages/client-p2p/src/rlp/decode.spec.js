// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const rlpDecode = require('./decode');

describe('rlpDecode', () => {
  it('decodes, returning the message', () => {
    expect(
      rlpDecode(
        hexToU8a('0xcb00c900c100000000000000')
      )
    ).toBeDefined();
  });
});
