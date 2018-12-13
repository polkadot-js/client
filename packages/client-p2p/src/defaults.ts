// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const MAX_REQUEST_BLOCKS = 64;
const PROTOCOL_BASE = '/substrate';
const PROTOCOL_TYPE = '/sup';
const PROTOCOL_VERSION = 1;

export default {
  ADDRESS: '127.0.0.1',
  CLIENT_ID: 'polkadot-js/0.0.0',
  MAX_PEERS: 25,
  MAX_REQUEST_BLOCKS,
  MAX_QUEUED_BLOCKS: MAX_REQUEST_BLOCKS * 8,
  MIN_IDLE_BLOCKS: 16,
  PORT: 31333,
  ROLE: 'full',
  PROTOCOL_BASE,
  PROTOCOL_TYPE,
  PROTOCOL_VERSION,
  PROTOCOL_DOT: `${PROTOCOL_BASE}${PROTOCOL_TYPE}/${PROTOCOL_VERSION}`,
  PROTOCOL_PING: '/ipfs/ping/1.0.0'
};
