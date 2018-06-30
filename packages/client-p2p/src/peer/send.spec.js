// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import logger from '@polkadot/util/logger';
import Status from '@polkadot/client-p2p-messages/Status';

import send from './send';

const l = logger('test');

describe('send', () => {
  let self;
  let status;

  beforeEach(() => {
    self = {
      l,
      pushable: []
    };
    status = new Status({
      bestHash: new Uint8Array(),
      bestNumber: new BN(0),
      genesisHash: new Uint8Array(),
      roles: [],
      version: 0
    });
  });

  it('returns false when sending fails', () => {
    self.pushable = null;

    expect(
      send(self, status)
    ).toEqual(false);
  });

  it('returns true when sent', () => {
    expect(
      send(self, status)
    ).toEqual(true);
  });

  it('upopn sending, message is added to pushable', () => {
    send(self, status);

    expect(
      self.pushable[0]
    ).toBeDefined();
  });
});
