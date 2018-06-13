// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const LibP2P = require('libp2p');
const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const isInstanceOf = require('@polkadot/util/is/instanceOf');
const l = require('@polkadot/util/logger')('test');

const createNode = require('./node');

describe('createNode', () => {
  let origPeerInfoCreate;
  let count = 0;

  beforeEach(() => {
    origPeerInfoCreate = PeerInfo.create;
    PeerInfo.create = (callback) => {
      origPeerInfoCreate(new PeerId(Buffer.from([count++])), callback);
    };
  });

  afterEach(() => {
    PeerInfo.create = origPeerInfoCreate;
  });

  it('creates a valid LibP2p instance', async () => {
    const libp2p = await createNode({ config: { p2p: { address: '127.0.0.1', port: 36789 } }, l });

    expect(
      isInstanceOf(libp2p, LibP2P)
    ).toEqual(true);
  });
});
