// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '@polkadot/storage/types';
import type { ChainDb$Block } from '../types';

const expandKey = require('@polkadot/storage/create/key');

const createDb = require('../db');
const keys = require('./keys');

module.exports = function blockDb (baseDb: BaseDb): ChainDb$Block {
  const db = createDb(baseDb);

  return {
    db,
    bestHash: expandKey(keys.public.bestHash, db),
    bestNumber: expandKey(keys.public.bestNumber, db),
    block: expandKey(keys.public.blockByHash, db)
  };
};
