// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Logger } from '@polkadot/util/types';

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

export default async function createNode ({ p2p: { address, nodes = [], port } }: Config, { chain: { bootNodes = [] } }: ChainInterface, l: Logger): Promise<Libp2p> {
  const peerBook = await createPeerBook([]);
  const peerInfo = await createListener(address, port);
  const modules = createModules(peerInfo, bootNodes, nodes);
  const addrs = peerInfo.multiaddrs.toArray().map((addr) => addr.toString());

  l.log(`creating Libp2p with ${addrs.join(', ')}`);

  return new Libp2p({
    config,
    modules,
    peerBook,
    peerInfo
  });
}
