// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RoleType } from '@polkadot/primitives/role';

const ADDRESS = '127.0.0.1';
const CLIENT_ID = 'client/0.0.0';
const MAX_PEERS = 25;
const PORT = 30903;
const ROLE: RoleType = 'none';

module.exports = {
  ADDRESS,
  CLIENT_ID,
  MAX_PEERS,
  PORT,
  ROLE
};
