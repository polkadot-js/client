// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const StatusMessage = require('../message/status');
const rlpEncode = require('../rlp/encode');
const send = require('./send');

describe('send', () => {
  let self;

  beforeEach(() => {
    self = {
      pushable: []
    };
  });

  it('returns false when sending fails', () => {
    self.pushable = null;

    expect(
      send(self)
    ).toEqual(false);
  });

  it('returns true when sent', () => {
    expect(
      send(self, new StatusMessage())
    ).toEqual(true);
  });

  it('upopn sending, message is added to pushable', () => {
    const message = new StatusMessage();

    send(self, message);

    expect(
      self.pushable[0]
    ).toEqual(
      u8aToBuffer(
        rlpEncode(message)
      )
    );
  });
});
