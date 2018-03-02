// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainInterface } from '@polkadot/client-chains/types';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ConfigType } from '../types';

const loadChain = require('@polkadot/client-chains/load');
const createPolkadot = require('@polkadot/client-polkadot');

module.exports = function createChain (config: ConfigType, stateDb: BaseDbInterface, blockDb: BaseDbInterface): ChainInterface {
  const chain = loadChain(config);

  switch (chain.type) {
    case 'polkadot':
      return createPolkadot(config, chain, stateDb, blockDb);

    default:
      throw new Error(`Handler for chain type '${chain.type}' not available`);
  }
};
