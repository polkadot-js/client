// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { ChainInterface } from './types';

import createExecutor from '@polkadot/client-wasm';

import loadChain from './load';
import createGenesis from './genesis';
import createState from './state';

export default function chains (config: Config, baseStateDb: TrieDb, baseBlockDb: TrieDb): ChainInterface {
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
