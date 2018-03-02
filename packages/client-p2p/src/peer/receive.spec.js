// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const pull = require('pull-stream');
const pushable = require('pull-pushable');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');

const StatusMessage = require('../message/status');
const rlpEncode = require('../rlp/encode');

const receive = require('./receive');

describe('receive', () => {
  let self;

  beforeEach(() => {
    self = {
      emitter: {
        emit: jest.fn(() => true)
      },
      pushable: pushable()
    };
  });

  it('returns false when on error', () => {
    expect(
      receive(self)
    ).toEqual(false);
  });

  it('returns true when no error', () => {
    expect(
      receive(self, pull.through())
    ).toEqual(true);
  });

  it('emits the decoded message', (done) => {
    const message = u8aToBuffer(
      rlpEncode(new StatusMessage())
    );

    self.emitter.emit = (type, _message) => {
      expect(type).toEqual('message');
      expect(_message).toEqual(message);

      done();
    };

    receive(self, pull.through([ message ]));
  });
});
