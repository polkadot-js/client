// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb, BlockDb } from '../types';

const createBn = require('../db/bn');
const createU8a = require('../db/u8a');
const createDb = require('../db');
const keys = require('./keys');

module.exports = function blockDb (baseDb: BaseDb): BlockDb {
  const db = createDb(baseDb);

  return {
    db,
    bestHash: createU8a(db, keys.public.bestHash),
    bestNumber: createBn(db, keys.public.bestNumber, 64),
    block: createU8a(db, keys.public.blockByHash)
  };
};
