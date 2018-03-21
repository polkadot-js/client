// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { ChainConfig, ChainInterface } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotState } from './types';

const createRuntime = require('@polkadot/client-runtime');
const l = require('@polkadot/util/logger')('polkadot');

const createBlockDb = require('./dbBlock');
const createStateDb = require('./dbState');
const initGenesis = require('./genesis');
const createExecutor = require('./executor');

module.exports = function polkadot (config: Config, chain: ChainConfig, baseStateDb: BaseDbInterface, baseBlockDb: BaseDbInterface): ChainInterface {
  const runtime = createRuntime(chain, baseStateDb);
  const blockDb = createBlockDb(baseBlockDb);
  const stateDb = createStateDb(runtime.environment.db);

  const self: PolkadotState = {
    blockDb,
    config,
    chain,
    l,
    runtime,
    stateDb
  };

  const executor = createExecutor(self);
  const genesis = initGenesis(self);
  const { getBlockHash, getNonce } = stateDb.system;

  return {
    blocks: blockDb,
    config: chain,
    executor,
    genesis,
    state: {
      getBlockHash,
      getNonce
    }
  };
};
