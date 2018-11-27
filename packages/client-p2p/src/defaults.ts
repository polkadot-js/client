// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const ADDRESS = '127.0.0.1';
const CLIENT_ID = 'polkadot-js/0.0.0';
const MAX_PEERS = 25;
const MAX_REQUEST_BLOCKS = 64;
const MAX_QUEUED_BLOCKS = MAX_REQUEST_BLOCKS * 4; // 2048 in the Rust client
const PORT = 31333;
const ROLE = 'full';
const PROTOCOL_BASE = '/substrate';
const PROTOCOL_TYPE = '/dot';
const PROTOCOL_VERSION = 1;
const PROTOCOL_DOT = `${PROTOCOL_BASE}${PROTOCOL_TYPE}/${PROTOCOL_VERSION}`;
const PROTOCOL_PING = '/ipfs/ping/1.0.0';

export default {
  ADDRESS,
  CLIENT_ID,
  MAX_PEERS,
  MAX_QUEUED_BLOCKS,
  MAX_REQUEST_BLOCKS,
  PORT,
  PROTOCOL_PING,
  PROTOCOL_DOT,
  PROTOCOL_BASE,
  PROTOCOL_TYPE,
  PROTOCOL_VERSION,
  ROLE
};
