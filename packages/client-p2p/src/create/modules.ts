// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { EnvType, P2pNodes } from '../types';

import DHT from 'libp2p-kad-dht';
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

export default function createModules (envType: EnvType, peerInfo: PeerInfo, bootNodes: P2pNodes, nodes: P2pNodes): LibP2p.OptionsModules {
  const isCli = envType !== 'browser';
  const starTransports = [new WebRTCStar({ id: peerInfo.id }), new WebSocketStar({ id: peerInfo.id })];
  const transport = isCli
    ? [new WS(), new TCP()]
    : [new WS()].concat(starTransports);
  const peerDiscovery = isCli
    ? [new Bootstrap({ list: bootNodes })]
    : starTransports.map((transport) => transport.discovery);

  return {
    connEncryption: [
      secio
    ],
    streamMuxer: [
      mplex,
      spdy
    ],
    dht: DHT,
    peerDiscovery,
    transport
  };
}
