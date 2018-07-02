// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import pull from 'pull-stream';
import pushable from 'pull-pushable';
import logger from '@polkadot/util/logger';

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
});
