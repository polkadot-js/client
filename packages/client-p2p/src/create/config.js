// Copyright 2017-2018 @polkadot/client-p2p authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { P2pNodes } from '../types';

const DHT = require('libp2p-kad-dht');
const mplex = require('libp2p-mplex');
// const Multicast = require('libp2p-mdns');
const Railing = require('libp2p-railing');
// const secio = require('libp2p-secio');
const spdy = require('libp2p-spdy');
const TCP = require('libp2p-tcp');
const PeerInfo = require('peer-info');
// const WS = require('libp2p-websockets');

module.exports = function createConfig (peerInfo: PeerInfo, bootNodes: P2pNodes): LibP2P$Config {
  return {
    connection: {
      crypto: [
        // secio
      ],
      muxer: [
        mplex,
        spdy
      ]
    },
    DHT,
    discovery: [
      // new Multicast(peerInfo),
      new Railing(bootNodes)
    ],
    transport: [
      new TCP()
      // new WS()
    ]
  };
};
