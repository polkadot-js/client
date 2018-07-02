// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { P2pNodes } from '../types';

import DHT from 'libp2p-kad-dht';
import mplex from 'libp2p-mplex';
// import Multicast from 'libp2p-mdns';
import Railing from 'libp2p-railing';
// import secio from 'libp2p-secio';
import spdy from 'libp2p-spdy';
import TCP from 'libp2p-tcp';
import PeerInfo from 'peer-info';
// import WS from 'libp2p-websockets';

export default function createModules (peerInfo: PeerInfo, bootNodes: P2pNodes): LibP2p.OptionsModules {
  return {
    connEncryption: [
      // secio
    ],
    streamMuxer: [
      mplex,
      spdy
    ],
    dht: DHT,
    peerDiscovery: [
      // new Multicast(peerInfo),
      new Railing({ list: bootNodes })
    ],
    transport: [
      new TCP()
      // new WS()
    ]
  };
}
