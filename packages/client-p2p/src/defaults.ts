// Copyright 2017-2019 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const MAX_REQUEST_BLOCKS = 128;
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
  DISCOVER_STAR_ENABLED: false,
  MAX_PEERS: 25,
  MAX_REQUEST_BLOCKS,
  MAX_QUEUED_BLOCKS: MAX_REQUEST_BLOCKS * 8,
  MIN_IDLE_BLOCKS: 16,
  PING_INTERVAL: 30000,
  PING_LENGTH: 32,
  PORT: 60666, // 2x 30333
  ROLE: 'full',
  PROTOCOL_BASE,
  PROTOCOL_VERSION,
  MIN_PROTOCOL_VERSION,
  PROTOCOL_PING: '/ipfs/ping/1.0.0',
  SIGNALLING: [
    // https://github.com/libp2p/js-libp2p-webrtc-star
    // '/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star/p2p',
    // https://github.com/libp2p/js-libp2p-websocket-star
    // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/p2p',
    // '/dns4/wss-star-test.polkadot.io/tcp/443/wss/p2p-websocket-star/p2p',
    // NOTE The websocket-star split on `ipfs` (doesn't yet to p2p)
    '/dns4/wss-star-test.polkadot.io/tcp/9090/ws/p2p-websocket-star/p2p'
  ],
  WAIT_TIMEOUT: 60 * 1000,
  getProtocol
};
