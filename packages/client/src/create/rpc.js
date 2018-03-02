// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcInterface } from '@polkadot/client-rpc/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { ConfigType, EndpointType } from '../types';

const createRpc = require('@polkadot/client-rpc');

const client = require('../rpc/client');

const handlers: EndpointType = Object.assign({}, client);

module.exports = function initRpc (config: ConfigType, chain: ChainInterface): RpcInterface {
  return createRpc(config, chain, handlers);
};
