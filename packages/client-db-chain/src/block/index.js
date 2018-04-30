// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/db/types';
import type { ChainDb$Block } from './types';

const wrapDb = require('@polkadot/db/wrap');
const expandMethod = require('@polkadot/db/create/method');

const keys = require('./keys');

module.exports = function blockDb (baseDb: BaseDbInterface): ChainDb$Block {
  const db = wrapDb(baseDb);

  return {
    bestHash: expandMethod(keys.bestHash, db),
    bestNumber: expandMethod(keys.bestNumber, db),
    block: expandMethod(keys.blockByHash, db)
  };
};
