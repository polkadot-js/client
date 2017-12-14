// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { StatusMessage, StatusMessageJson } from './types';

const roleToId = require('@polkadot/primitives/role/toId');
const blockNumberToJson = require('@polkadot/primitives-json/blockNumber/encode');
const headerHashToJson = require('@polkadot/primitives-json/headerHash/encode');

module.exports = function statusEncode (status: StatusMessage): StatusMessageJson {
  return {
    version: status.version,
    roles: status.roles.map(roleToId),
    bestNumber: blockNumberToJson(status.bestNumber),
    bestHash: headerHashToJson(status.bestHash),
    genesisHash: headerHashToJson(status.genesisHash)
  };
};
