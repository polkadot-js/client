// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { StateInterface } from '@polkadot/client-state/types';
import type { ConfigType, EndpointType } from '../types';

const Rpc = require('@polkadot/client-rpc');

const client = require('../rpc/client');

const handlers: EndpointType = Object.assign({}, client);

module.exports = function initRpc (config: ConfigType, state: StateInterface): Rpc {
  return new Rpc(config, state, handlers);
};
