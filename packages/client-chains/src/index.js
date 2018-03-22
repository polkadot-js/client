// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainInterface, ChainState } from './types';

const createBlockDb = require('@polkadot/client-db-chain/block');
const createStateDb = require('@polkadot/client-db-chain/state');
const createRuntime = require('@polkadot/client-runtime');
const logger = require('@polkadot/util/logger');

const loadChain = require('./load');

module.exports = function chains (config: Config, baseStateDb: BaseDbInterface, baseBlockDb: BaseDbInterface): ChainInterface {
  const l = logger(`chain-${config.chain}`);
  const chain = loadChain(config.chain);
  const runtime = createRuntime(chain.config, baseStateDb);
  const blockDb = createBlockDb(baseBlockDb);
  const stateDb = createStateDb(runtime.environment.db);

  const self: ChainState = {
    blockDb,
    config,
    chain: chain.config,
    l,
    runtime,
    stateDb
  };

  chain.genesis(self);

  const { getBlockHash, getNonce } = stateDb.system;

  return {
    blocks: blockDb,
    config: chain.config,
    executor: chain.executor(self),
    state: {
      getBlockHash,
      getNonce
    }
  };
};
