// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import pull from 'pull-stream';
import pushable from 'pull-pushable';
import logger from '@polkadot/util/logger';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';

import status from '../message/status';
import decode from '../message/encode';
import receive from './receive';

const l = logger('test');

describe('receive', () => {
  let self;

  beforeEach(() => {
    self = {
      emitter: {
        emit: jest.fn(() => true)
      },
      l,
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

  // FIXME: Not operational, make it work
  it.skip('emits the decoded message', (done) => {
    const message = u8aToBuffer(
      decode(status().raw)
    );

    self.emitter.emit = (type, _message) => {
      expect(type).toEqual('message');
      expect(_message).toEqual(message);

      done();
    };

    receive(self, pull.through([ message ]));
  });
});
