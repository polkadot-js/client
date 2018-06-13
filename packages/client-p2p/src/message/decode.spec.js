// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromUtf8 = require('@polkadot/util/u8a/fromUtf8');

const decode = require('./decode');

describe('decode', () => {
  it('decodes, returning the message', () => {
    expect(
      decode(
        u8aFromUtf8('{"type":0,"message":{"bestHash":"0x00","bestNumber":"0x00","genesisHash":"0x00","roles":["none"],"version":"0"}}')
      )
    ).toBeDefined();
  });
});
