// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfig } from '@polkadot/client-chains/types';
import type { BaseDb } from '@polkadot/db/types';
import type { RuntimeEnv } from '../types';

const l = require('@polkadot/util/logger')('runtime');

const envDb = require('./db');
const envHeap = require('./heap');

module.exports = function environment (chain: ChainConfig, stateDb: BaseDb): RuntimeEnv {
  return {
    l,
    chain,
    db: envDb(stateDb),
    heap: envHeap()
  };
};
