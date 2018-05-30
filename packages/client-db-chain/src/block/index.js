// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDb } from '../types';
import type { BlockDb } from './types';

const createBn = require('../create/bn');
const createU8a = require('../create/u8a');
const createDb = require('../db');
const keys = require('./keys');

module.exports = function blockDb (baseDb: BaseDb): BlockDb {
  const db = createDb(baseDb);

  return {
    db,
    bestHash: createU8a(keys.public.bestHash, db),
    bestNumber: createBn(keys.public.bestNumber, db, 64),
    block: createU8a(keys.public.blockByHash, db)
  };
};
