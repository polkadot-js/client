// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const rlpDecode = require('./decode');

describe('rlpDecode', () => {
  it('decodes, returning the message', () => {
    expect(
      rlpDecode(
        Buffer.from('cb00c900c100000000000000', 'hex')
      )
    ).toBeDefined();
  });
});
