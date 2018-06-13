// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const l = require('@polkadot/util/logger')('test');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const status = require('../message/status');
const encode = require('../message/encode');
const send = require('./send');

describe('send', () => {
  let self;

  beforeEach(() => {
    self = {
      l,
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
      send(self, status({}))
    ).toEqual(true);
  });

  it('upopn sending, message is added to pushable', () => {
    const message = status({});

    send(self, message);

    expect(
      self.pushable[0]
    ).toEqual(
      u8aToBuffer(
        encode(message)
      )
    );
  });
});
