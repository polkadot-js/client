// Copyright 2017-2018 @polkadot/client authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RpcInterface } from '@polkadot/client-rpc/types';
import type { ChainInterface } from '@polkadot/client-chains/types';
import type { Config } from '../types';

const createRpc = require('@polkadot/client-rpc');

const state = require('./state');
const subscribe = require('./subscribe');
const system = require('./system');

module.exports = function rpc (config: Config, chain: ChainInterface): RpcInterface {
  return createRpc(config, chain, {
    ...state(config, chain),
    ...subscribe(config, chain),
    ...system(config, chain)
  });
};
