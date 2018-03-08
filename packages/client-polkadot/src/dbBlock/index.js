// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotBlockDb } from '../types';

const debug = require('../dbState/debug');
const getBlock = require('./getBlock');
const getBestHash = require('./getBestHash');
const getBestNumber = require('./getBestNumber');
const setBlock = require('./setBlock');
const setBest = require('./setBest');

module.exports = function blockDb (baseDb: BaseDbInterface): PolkadotBlockDb {
  return {
    debug: (): { [string]: string } =>
      debug(baseDb),
    getBlock: (hash: Uint8Array): Uint8Array =>
      getBlock(baseDb, hash),
    getBestHash: (): Uint8Array =>
      getBestHash(baseDb),
    getBestNumber: (): BN =>
      getBestNumber(baseDb),
    setBlock: (hash: Uint8Array, block: Uint8Array): void =>
      setBlock(baseDb, hash, block),
    setBest: (number: BN | number, hash: Uint8Array): void =>
      setBest(baseDb, number, hash)
  };
};
