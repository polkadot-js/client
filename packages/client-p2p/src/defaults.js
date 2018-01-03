// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { RoleType } from '@polkadot/primitives/role';

const ADDRESS = '127.0.0.1';
const CLIENT_ID = 'client/0.0.0';
const MAX_PEERS = 25;
const PORT = 39933;
const ROLE: RoleType = 'none';
const PROTOCOL_VERSION = 0;
const PROTOCOL = `/dot/0.0.${PROTOCOL_VERSION}`;

module.exports = {
  ADDRESS,
  CLIENT_ID,
  MAX_PEERS,
  PORT,
  PROTOCOL,
  PROTOCOL_VERSION,
  ROLE
};
