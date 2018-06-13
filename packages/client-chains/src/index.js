// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { ChainInterface } from './types';

const createExecutor = require('@polkadot/client-wasm');

const loadChain = require('./load');
const createGenesis = require('./genesis');
const createState = require('./state');

module.exports = function chains (config: Config, baseStateDb: TrieDb, baseBlockDb: TrieDb): ChainInterface {
  const initial = loadChain(config.chain);
  const self = createState(config, baseStateDb, baseBlockDb);
  const genesis = createGenesis(self, initial);
  const executor = createExecutor(config, self.blockDb, self.stateDb, self.runtime, genesis);

  return {
    blocks: self.blockDb,
    executor,
    genesis,
    state: self.stateDb
  };
};
