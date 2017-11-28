// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { RpcConfigType } from '@polkadot/client-rpc/types';

const Rpc = require('@polkadot/client-rpc');

const handlers = require('./handlers');

module.exports = function initRpc (config: RpcConfigType): Rpc {
  return new Rpc(config, handlers);
};
