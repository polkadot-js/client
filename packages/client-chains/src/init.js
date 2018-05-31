// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/client-db-chain/types';
import type { ChainDefinition, ChainInterface } from './types';

const createState = require('./state');

module.exports = function init (chain: ChainDefinition, baseStateDb: BaseDb, baseBlockDb: BaseDb): ChainInterface {
  const self = createState(chain, chain.config, baseStateDb, baseBlockDb);
  const executor = chain.executor(self);
  const genesis = chain.genesis(self);

  return {
    blocks: {
      getBestHash: self.blockDb.bestHash.get,
      getBestNumber: self.blockDb.bestNumber.get,
      getBlock: self.blockDb.block.get
    },
    config: chain.config,
    executor,
    genesis,
    state: {
      getBlockHash: self.stateDb.system.blockHashAt.get,
      getNonce: self.stateDb.system.accountIndexOf.get
    }
  };
};
