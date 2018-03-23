// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$Block } from './types';

const wrapDb = require('@polkadot/client-db/wrap');

const debug = require('../debug');
const bestHash = require('./bestHash');
const bestNumber = require('./bestNumber');
const block = require('./block');

module.exports = function blockDb (baseDb: BaseDbInterface): ChainDb$Block {
  const db = wrapDb(baseDb);

  return {
    debug: (): { [string]: string } =>
      debug(db),
    bestHash: bestHash(db),
    bestNumber: bestNumber(db),
    block: block(db)
  };
};
