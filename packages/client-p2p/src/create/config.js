// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig$Nodes } from '@polkadot/client-chains/types';

const KadDHT = require('libp2p-kad-dht');
const Multicast = require('libp2p-mdns');
const Multiplex = require('libp2p-mplex');
const Railing = require('libp2p-railing');
const TCP = require('libp2p-tcp');
const PeerInfo = require('peer-info');
// TODO: enable as required
// const Secio = require('libp2p-secio');
// const Spdy = require('libp2p-spdy');
// const WS = require('libp2p-websockets');

const arrayFilter = require('@polkadot/util/array/filter');

const DEFAULT_CRYPTO = []; // [Secio]
const DEFAULT_DHT = KadDHT;
const DEFAULT_MUXER = [
  Multiplex
  // Spdy
];
const DEFAULT_TRANSPORTS = [
  TCP
  // WS
];

module.exports = function createConfig (peerInfo: PeerInfo, bootNodes: ChainConfig$Nodes = []): LibP2P$Config {
  return {
    connection: {
      crypto: DEFAULT_CRYPTO,
      muxer: DEFAULT_MUXER
    },
    DHT: DEFAULT_DHT,
    discovery: arrayFilter(
      [
        new Multicast(peerInfo, {
          serviceTag: 'dot.mdns.local'
        }),
        bootNodes.length
          ? new Railing(bootNodes)
          : void 0
      ]
    ),
    transport: DEFAULT_TRANSPORTS.map((Clazz) => new Clazz())
  };
};
