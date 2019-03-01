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
  ADDRESS: '127.0.0.1',
  MAX_PEERS: 25,
  MAX_REQUEST_BLOCKS,
  MAX_QUEUED_BLOCKS: MAX_REQUEST_BLOCKS * 8,
  MIN_IDLE_BLOCKS: 16,
  PORT: 31333,
  ROLE: 'full',
  PROTOCOL_BASE,
  PROTOCOL_VERSION,
  MIN_PROTOCOL_VERSION,
  PROTOCOL_PING: '/ipfs/ping/1.0.0',
  getProtocol
};
