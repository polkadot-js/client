// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainInterface } from '@polkadot/client-chains/types';
import { Config } from '@polkadot/client/types';
import { Logger } from '@polkadot/util/types';

import Libp2p from 'libp2p';

import defaults from '../defaults';
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

export default async function createNode ({ p2p: { address = defaults.ADDRESS, discoverStar = false, discoverBoot = true, nodes = [], port = defaults.PORT, type } }: Config, { chain: { bootNodes = [] } }: ChainInterface, l: Logger): Promise<Libp2p> {
  const envType = type || 'nodejs';
  const isBrowser = envType === 'browser';
  const peerBook = await createPeerBook([]);
  const peerInfo = await createListener(envType, { address, discoverStar, port });
  const modules = createModules(envType, peerInfo, { bootNodes, discoverBoot, discoverStar, nodes });
  const addrs = peerInfo.multiaddrs.toArray().map((addr) =>
    addr.toString()
  );

  l.log(`creating Libp2p with addresses: (${addrs.length})`);

  addrs.forEach((addr) => l.log(`    ${addr}`));

  return new Libp2p({
    config: {
      ...config,
      peerDiscovery: {
        webRTCStar: {
          enabled: isBrowser
        },
        websocketStar: {
          enabled: isBrowser
        }
      }
    },
    modules,
    peerBook,
    peerInfo
  });
}
