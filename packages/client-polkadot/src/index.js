// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ConfigType } from '@polkadot/client/types';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotInterface } from './types';

const createRuntime = require('@polkadot/client-runtime');

const createDb = require('./db');
const initGenesis = require('./genesis');
const createExecutor = require('./executor');

module.exports = function polkadot (config: ConfigType, chain: ChainConfigType, db: BaseDbInterface): PolkadotInterface {
  const runtime = createRuntime(chain, db);
  const executor = createExecutor(config, runtime, chain.code);
  const genesis = initGenesis(chain, createDb(runtime.environment.db));

  return {
    executor,
    genesis
  };
};
