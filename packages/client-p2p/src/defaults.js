// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Role } from '@polkadot/primitives/role';

const ADDRESS = '127.0.0.1';
const CLIENT_ID = 'polkadot-js/0.0.0';
const MAX_PEERS = 25;
const MAX_SYNC_BLOCKS = 64;
const PORT = 39933;
const ROLE: Role = 'full';
const PROTOCOL_BASE = '/substrate';
const PROTOCOL_TYPE = '/dot';
const PROTOCOL_VERSION = 0;
const PROTOCOL = `${PROTOCOL_BASE}${PROTOCOL_TYPE}/${PROTOCOL_VERSION}`;

module.exports = {
  ADDRESS,
  CLIENT_ID,
  MAX_PEERS,
  MAX_SYNC_BLOCKS,
  PORT,
  PROTOCOL,
  PROTOCOL_BASE,
  PROTOCOL_TYPE,
  PROTOCOL_VERSION,
  ROLE
};
