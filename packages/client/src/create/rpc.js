// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { StateInterface } from '@polkadot/client-state/types';
import type { ConfigType, EndpointType } from '../types';

const Rpc = require('@polkadot/client-rpc');

const client = require('../rpc/client');

const handlers: EndpointType = Object.assign({}, client);

module.exports = function initRpc (config: ConfigType, state: StateInterface): Rpc {
  return new Rpc(config, state, handlers);
};
