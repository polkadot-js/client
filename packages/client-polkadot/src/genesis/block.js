// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotBlock } from '@polkadot/primitives/block';
import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { PolkadotDb } from '../types';

const createBlock = require('@polkadot/primitives-builder/block');
const trieRoot = require('@polkadot/util-triehash/root');

module.exports = function genesisBlock (chain: ChainConfigType, db: PolkadotDb): PolkadotBlock {
  return createBlock({
    header: {
      stateRoot: db.trieRoot(),
      transactionRoot: trieRoot([])
    }
  });
};
