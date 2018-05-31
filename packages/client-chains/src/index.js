// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '@polkadot/client/types';
import type { BaseDb } from '@polkadot/client-db-chain/types';
import type { ChainInterface } from './types';

const loadChain = require('./load');
const initChain = require('./init');

module.exports = function chains (config: Config, baseStateDb: BaseDb, baseBlockDb: BaseDb): ChainInterface {
  return initChain(
    config,
    loadChain(config.chain),
    baseStateDb,
    baseBlockDb
  );
};
