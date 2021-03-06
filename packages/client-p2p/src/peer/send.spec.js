// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { Status } from '@polkadot/client-types/messages';

import Peer from '.';

describe('send', () => {
  let peer;
  let status;

  beforeEach(() => {
    const peerInfo = {
      id: {
        toB58String: () => '123'
      }
    };
    peer = new Peer({}, {}, null, peerInfo);
    peer.connections = new Map([[0, { pushable: ['test'] }]]);

    status = new Status({
      bestHash: new Uint8Array([]),
      bestNumber: new BN(0),
      geneisHash: new Uint8Array([]),
      roles: []
    });
  });

  it('returns false when sending fails', () => {
    peer.connections = new Map([[0, {
      pushable: {
        push: () => { throw new Error('invalid'); }
      }
    }]]);

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
      peer.connections.get(0).pushable
    ).toHaveLength(2);
  });
});
