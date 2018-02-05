// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { DbInterface } from '@polkadot/client-db/types';
import type { RuntimeEnv } from '../types';

const l = require('@polkadot/util/logger')('runtime');

const envHeap = require('./heap');
const envStorage = require('./storage');

module.exports = function environment (memory: WebAssembly.Memory, chain: ChainConfigType, db: DbInterface): RuntimeEnv {
  return {
    l,
    chain,
    storage: envStorage(db),
    heap: envHeap(memory)
  };
};
