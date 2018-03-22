// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$Block } from '../types';

const wrapDb = require('@polkadot/client-db/wrap');

const debug = require('../debug');
const getBlock = require('./getBlock');
const getBestHash = require('./getBestHash');
const getBestNumber = require('./getBestNumber');
const setBlock = require('./setBlock');
const setBest = require('./setBest');

module.exports = function block (baseDb: BaseDbInterface): ChainDb$Block {
  const db = wrapDb(baseDb);

  return {
    debug: (): { [string]: string } =>
      debug(db),
    getBlock: (hash: Uint8Array): Uint8Array =>
      getBlock(db, hash),
    getBestHash: (): Uint8Array =>
      getBestHash(db),
    getBestNumber: (): BN =>
      getBestNumber(db),
    setBlock: (hash: Uint8Array, block: Uint8Array): void =>
      setBlock(db, hash, block),
    setBest: (number: BN | number, hash: Uint8Array): void =>
      setBest(db, number, hash)
  };
};
