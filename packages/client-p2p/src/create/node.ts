// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';

import Libp2p from 'libp2p';

import createModules from './modules';
import createListener from './listener';
import createPeerBook from './peerBook';

const config = {
  dht: {
    kBucketSize: 20
  },
  EXPERIMENTAL: {
    pubsub: false,
    dht: true
  }
};

export default async function createNode ({ p2p: { address, port, nodes = [] } }: Config): Promise<Libp2p> {
  const peerBook = await createPeerBook([]);
  const peerInfo = await createListener(address, port);
  const modules = createModules(peerInfo, nodes);

  return new Libp2p({
    config,
    modules,
    peerBook,
    peerInfo
  });
}
