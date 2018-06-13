// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const PeerBook = require('peer-book');
const PeerId = require('peer-id');
const PeerInfo = require('peer-info');

const isInstanceOf = require('@polkadot/util/is/instanceOf');

const createPeerBook = require('./peerBook');

describe('createPeerBook', () => {
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

  it('returns a PeerBook instance', async () => {
    const peerBook = await createPeerBook();

    expect(
      isInstanceOf(peerBook, PeerBook)
    ).toEqual(true);
  });

  it('has the provided peers added', async () => {
    const addresses = [
      '/ip4/127.0.0.1/tcp/8888',
      '/ip4/127.0.0.1/tcp/8899'
    ];
    const peerBook = await createPeerBook(addresses);

    expect(
      peerBook.getAllArray()
    ).toHaveLength(2);
  });
});
