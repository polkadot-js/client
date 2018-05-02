// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/storage/types';
import type { ChainDb$Block } from './types';

const wrapDb = require('@polkadot/storage/wrap');
const expandKey = require('@polkadot/storage/create/key');

const keys = require('./keys').keys;

module.exports = function blockDb (baseDb: BaseDb): ChainDb$Block {
  const db = wrapDb(baseDb);

  return {
    db,
    bestHash: expandKey(keys.bestHash, db),
    bestNumber: expandKey(keys.bestNumber, db),
    block: expandKey(keys.blockByHash, db)
  };
};
