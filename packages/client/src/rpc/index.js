// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { ConfigType } from '../cli/types';
import type { EndpointType } from './types';

const Rpc = require('@polkadot/client-rpc');

const client = require('./client');

const handlers: EndpointType = Object.assign({}, client);

module.exports = function initRpc (config: ConfigType): Rpc {
  return new Rpc(config.rpc, handlers);
};
