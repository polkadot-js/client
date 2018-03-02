// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotBlockDb } from '../types';

const getBlock = require('./getBlock');
const getLatestHash = require('./getLatestHash');
const getLatestNumber = require('./getLatestNumber');
const setBlock = require('./setBlock');
const setLatest = require('./setLatest');

module.exports = function blockDb (baseDb: BaseDbInterface): PolkadotBlockDb {
  return {
    // debug: (): { [string]: string } =>
    //   baseDb.pairs().reduce((result, { k, v }) => {
    //     result[k.toString()] = `[${v.toString()}]`;
    //
    //     return result;
    //   }, {}),
    getBlock: (hash: Uint8Array): Uint8Array =>
      getBlock(baseDb, hash),
    getLatestHash: (): Uint8Array =>
      getLatestHash(baseDb),
    getLatestNumber: (): BN =>
      getLatestNumber(baseDb),
    setBlock: (hash: Uint8Array, block: Uint8Array): void =>
      setBlock(baseDb, hash, block),
    setLatest: (number: BN | number, hash: Uint8Array): void =>
      setLatest(baseDb, number, hash)
  };
};
