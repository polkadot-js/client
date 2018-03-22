// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$Block } from '../types';

const wrapDb = require('@polkadot/client-db/wrap');

const debug = require('../debug');
const createBestHash = require('./bestHash');
const createBestNumber = require('./bestNumber');
const createBlock = require('./block');

module.exports = function blockDb (baseDb: BaseDbInterface): ChainDb$Block {
  const db = wrapDb(baseDb);
  const bestHash = createBestHash(db);
  const bestNumber = createBestNumber(db);
  const block = createBlock(db);

  return {
    debug: (): { [string]: string } =>
      debug(db),
    getBlock: block.get,
    getBestHash: bestHash.get,
    getBestNumber: bestNumber.get,
    setBlock: block.set,
    setBest: (number: BN | number, hash: Uint8Array): void => {
      bestHash.set(hash);
      bestNumber.set(number);
    }
  };
};
