// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$Block } from './types';

const wrapDb = require('@polkadot/client-db/wrap');

const { kNv64, kNvU, kUvU } = require('../getset');
const debug = require('../debug');

const keys = require('./keys');

module.exports = function blockDb (baseDb: BaseDbInterface): ChainDb$Block {
  const db = wrapDb(baseDb);

  return {
    debug: (): { [string]: string } =>
      debug(db),
    bestHash: kNvU(db, keys.BEST_HASH),
    bestNumber: kNv64(db, keys.BEST_NUMBER),
    block: kUvU(db, keys.BLOCK_BY_HASH)
  };
};
