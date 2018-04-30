// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { BaseDb } from '@polkadot/db/types';
import type { ChainInterface } from './types';

const loadChain = require('./load');
const createState = require('./state');

module.exports = function chains (config: Config, baseStateDb: BaseDb, baseBlockDb: BaseDb): ChainInterface {
  const chain = loadChain(config.chain);
  const self = createState(chain, config, baseStateDb, baseBlockDb);

  chain.genesis(self);

  return {
    blocks: {
      getBestHash: self.blockDb.bestHash.get,
      getBestNumber: self.blockDb.bestNumber.getn,
      getBlock: self.blockDb.block.get
    },
    config: chain.config,
    executor: chain.executor(self),
    state: {
      getBlockHash: self.stateDb.system.blockHashAt.get,
      getNonce: self.stateDb.system.nonceOf.getn
    }
  };
};
