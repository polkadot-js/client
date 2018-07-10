// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import logger from '@polkadot/util/logger';
import Status from '@polkadot/client-p2p-messages/Status';

import Peer from './index';

describe('send', () => {
  let peer;
  let status;

  beforeEach(() => {
    const peerInfo = {
      id: {
        toB58String: () => '123'
      }
    };
    peer = new Peer({}, {}, peerInfo);
    peer.pushable = [];

    status = new Status({
      bestHash: new Uint8Array([]),
      bestNumber: new BN(0),
      geneisHash: new Uint8Array([]),
      roles: []
    });
  });

  it('returns false when sending fails', () => {
    peer.pushable = null;

    expect(
      peer.send(status)
    ).toEqual(false);
  });

  it('returns true when sent', () => {
    expect(
      peer.send(status)
    ).toEqual(true);
  });

  it('upopn sending, message is added to pushable', () => {
    peer.send(status);

    expect(
      peer.pushable[0]
    ).toBeDefined();
  });
});
