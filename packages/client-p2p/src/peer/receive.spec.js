// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import pull from 'pull-stream';

import Peer from '.';

describe('receive', () => {
  let peer;

  beforeEach(() => {
    const peerInfo = {
      disconnect: () => void 0,
      id: {
        toB58String: () => '123'
      }
    };
    peer = new Peer({}, {}, null, peerInfo);
  });

  it('returns false when on error', () => {
    expect(
      peer._receive()
    ).toEqual(false);
  });

  it('returns true when no error', () => {
    expect(
      peer._receive(pull.through())
    ).toEqual(true);
  });
});
