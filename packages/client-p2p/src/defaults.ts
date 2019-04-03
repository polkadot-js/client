// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const PROTOCOL_BASE = 'substrate';
const PROTOCOL_TYPE = 'sup';
const PROTOCOL_VERSION = 2;
const MIN_PROTOCOL_VERSION = 2;

function getProtocol (type?: string | null): string {
  return `/${PROTOCOL_BASE}/${type || PROTOCOL_TYPE}/${PROTOCOL_VERSION}`;
}

export default {
  ADDRESS: '0.0.0.0',
  DISCOVER_BOOT_ENABLED: true,
  DISCOVER_RAND_ENABLED: true,
  DISCOVER_STAR_ENABLED: true,
  MAX_PEERS: 25,
  PING_INTERVAL: 30000,
  PING_LENGTH: 32,
  PORT: 60666, // 2x 30333
  ROLE: 'full',
  PROTOCOL_BASE,
  PROTOCOL_VERSION,
  MIN_PROTOCOL_VERSION,
  PROTOCOL_PING: '/ipfs/ping/1.0.0',
  SIGNALLING: [
    '/dns4/wss-star.polkadotjs.net/tcp/443/wss/p2p-websocket-star/p2p'
    //'/dns4/wss-star-test.polkadot.io/tcp/9090/ws/p2p-websocket-star/p2p'
    // '/dnsaddr/wss-star-test.polkadot.io/tcp/443/wss/p2p-websocket-star',
    // '/dns4/wss-star-test.polkadot.io/tcp/9090/ws/p2p-websocket-star'
  ],
  WAIT_TIMEOUT: 60 * 1000,
  getProtocol
};
