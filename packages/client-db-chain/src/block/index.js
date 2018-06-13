// Copyright 2017-2018 @polkadot/client-db-chain authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { TrieDb } from '@polkadot/util-triedb/types';
import type { BlockDb } from '../types';

const createBn = require('../db/bn');
const createU8a = require('../db/u8a');
const keys = require('./keys');

module.exports = function blockDb (db: TrieDb): BlockDb {
  return {
    db,
    bestHash: createU8a(db, keys.public.bestHash),
    bestNumber: createBn(db, keys.public.bestNumber, 64),
    block: createU8a(db, keys.public.blockByHash),
    header: createU8a(db, keys.public.headerByHash)
  };
};
