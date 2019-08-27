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
    enabled: true,
    kBucketSize: 20,
    randomWalk: {
      enabled: true
    }
  },
  // pubsub: {
  //   enabled: false
  // }
  EXPERIMENTAL: {
    pubsub: false
  }
};

export default async function createNode ({ externalIp, p2p: { address = defaults.ADDRESS, discoverStar = false, discoverBoot = true, nodes = [], port = defaults.PORT, type, wrtc } }: Config, { chain: { bootNodes = [] } }: ChainInterface, l: Logger): Promise<Libp2p> {
  const envType = type || 'nodejs';
  const peerBook = await createPeerBook([]);
  const peerInfo = await createListener(envType, { address, discoverStar, externalIp, port });
  const modules = createModules(envType, peerInfo, { bootNodes, discoverBoot, discoverStar, nodes, wrtc });
  const addrs = peerInfo.multiaddrs.toArray().map((addr): string => addr.toString());

  l.log('creating Libp2p with addresses:');

  addrs.forEach((addr): void => l.log(`    ${addr}`));

  return new Libp2p({
    config: {
      ...config,
      peerDiscovery: {
        autoDial: false,
        enabled: true,
        webRTCStar: {
          enabled: discoverStar
        },
        websocketStar: {
          enabled: discoverStar
        }
      }
    },
    modules,
    peerBook,
    peerInfo
  });
}
