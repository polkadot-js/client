// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType, P2pNodes } from '../types';

import dht from 'libp2p-kad-dht';
// import mplex from 'libp2p-mplex';
// import Multicast from 'libp2p-mdns';
import Bootstrap from 'libp2p-bootstrap';
import secio from 'libp2p-secio';
import spdy from 'libp2p-spdy';
import TCP from 'libp2p-tcp';
import PeerInfo from 'peer-info';
import WebRTCStar from 'libp2p-webrtc-star';
import WebSocketStar from 'libp2p-websocket-star';
import WS from 'libp2p-websockets';
import mplex from 'pull-mplex';

type Config = {
  discoverBoot: boolean,
  discoverStar: boolean,
  bootNodes: P2pNodes,
  nodes: P2pNodes
};

export default function createModules (envType: EnvType, { id }: PeerInfo, { bootNodes, discoverBoot, discoverStar, nodes }: Config): LibP2p.OptionsModules {
  const isCli = envType !== 'browser';
  const starTransports = discoverStar
    ? [new WebRTCStar({ id }), new WebSocketStar({ id })]
    : [];
  const transport = isCli
    ? [new WS(), new TCP()]
    : [new WS()];
  const peerDiscovery = isCli
    ? [new Bootstrap({ list: (discoverBoot ? bootNodes : []).concat(nodes) })]
    : [];

  return {
    connEncryption: [
      secio
    ],
    streamMuxer: [
      mplex,
      spdy
    ],
    dht,
    peerDiscovery: peerDiscovery.concat(
      starTransports.map(({ discovery }) => discovery)
    ),
    transport: transport.concat(starTransports)
  };
}
