// Copyright 2017-2018 @polkadot/client-chains authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Config } from '@polkadot/client/types';
import { BaseDb, TrieDb } from '@polkadot/client-db/types';
import { ChainState } from './types';

import createBlockDb from '@polkadot/client-db-chain/block';
import createStateDb from '@polkadot/client-db-chain/state';
import createRuntime from '@polkadot/client-runtime/index';
import logger from '@polkadot/util/logger';

export default function state (config: Config, baseStateDb: TrieDb, baseBlockDb: BaseDb): ChainState {
  const l = logger(`chain/${config.chain}`);
  const runtime = createRuntime(baseStateDb);
  const blockDb = createBlockDb(baseBlockDb);
  const stateDb = createStateDb(baseStateDb);

  return {
    blockDb,
    config,
    l,
    runtime,
    stateDb
  };
}
