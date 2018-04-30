// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { BaseDb } from '@polkadot/db/types';
import type { ChainDefinition, ChainState } from './types';

const createBlockDb = require('@polkadot/client-db-chain/block');
const createStateDb = require('@polkadot/client-db-chain/state');
const createRuntime = require('@polkadot/client-runtime');
const logger = require('@polkadot/util/logger');

module.exports = function state (chain: ChainDefinition, config: Config, baseStateDb: BaseDb, baseBlockDb: BaseDb): ChainState {
  const l = logger(`chain-${config.chain}`);
  const runtime = createRuntime(chain.config, baseStateDb);
  const blockDb = createBlockDb(baseBlockDb);
  const stateDb = createStateDb(runtime.environment.db);

  return {
    blockDb,
    config,
    chain: chain.config,
    l,
    runtime,
    stateDb
  };
};
