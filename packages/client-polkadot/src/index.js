// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType, ChainInterface } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';

const createRuntime = require('@polkadot/client-runtime');

const createDb = require('./db');
const initGenesis = require('./genesis');
const createExecutor = require('./executor');

module.exports = function polkadot (config: ConfigType, chain: ChainConfigType, stateDb: BaseDbInterface, blockDb: BaseDbInterface): ChainInterface {
  const runtime = createRuntime(chain, stateDb);
  const polkadb = createDb(runtime.environment.db);
  const executor = createExecutor(config, runtime, chain.code);
  const genesis = initGenesis(chain, polkadb);
  const { getBlockHash, getNonce } = polkadb.system;

  return {
    blocks: {
      // getBlock: (hash: Uint8Array) => Uint8Array,
      // getLatestHash: () => Uint8Array,
      // getLatestNumber: () => BN
    },
    executor,
    genesis,
    state: {
      getBlockHash,
      getNonce
    }
  };
};
