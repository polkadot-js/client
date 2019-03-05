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
  const isBrowser = envType === 'browser';
  const transport = isBrowser
    ? [new WebRTCStar({ id: peerInfo.id }), new WebSocketStar({ id: peerInfo.id })]
    : [new TCP()];
  const peerDiscovery = isBrowser
    ? transport.map((transport) => (transport as WebRTCStar).discovery)
    : [];

  return {
    connEncryption: [
      secio
    ],
    streamMuxer: [
      mplex,
      spdy
    ],
    dht: DHT,
    peerDiscovery: peerDiscovery.concat([
      // new Multicast(peerInfo),
      new Bootstrap({
        list: bootNodes
      })
    ]),
    transport: transport.concat([
      new WS()
    ])
  };
}
