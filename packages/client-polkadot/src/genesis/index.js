// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotBlock } from '@polkadot/primitives/block';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { PolkadotDb } from '../types';

const initStorage = require('./storage');
const initBlock = require('./block');

module.exports = function genesis (chain: ChainConfigType, db: PolkadotDb): PolkadotBlock {
  initStorage(chain, db);

  return initBlock(chain, db);
};
