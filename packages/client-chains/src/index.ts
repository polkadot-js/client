// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BaseDb, TrieDb } from '@polkadot/client-db/types';
import { ChainInterface } from './types';

import createExecutor from '@polkadot/client-wasm/index';

import loadChain from './load';
import createGenesis from './genesis';
import createState from './state';

export default function chains (config: Config, baseStateDb: TrieDb, baseBlockDb: BaseDb): ChainInterface {
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
}
