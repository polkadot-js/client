// Copyright 2017-2018 @polkadot/client-chains authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { TrieDb } from '@polkadot/util-triedb/types';
import type { ChainState } from './types';

const createBlockDb = require('@polkadot/client-db-chain/block');
const createStateDb = require('@polkadot/client-db-chain/state');
const createRuntime = require('@polkadot/client-runtime');
const logger = require('@polkadot/util/logger');

module.exports = function state (config: Config, baseStateDb: TrieDb, baseBlockDb: TrieDb): ChainState {
  const l = logger(`chain-${config.chain}`);
  const runtime = createRuntime(baseStateDb);
  const blockDb = createBlockDb(baseBlockDb);
  const stateDb = createStateDb(runtime.environment.db);

  return {
    blockDb,
    config,
    l,
    runtime,
    stateDb
  };
};
