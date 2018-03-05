// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotStateDb$System } from '../../types';

const getBlockHash = require('./getBlockHash');
const getCode = require('./getCode');
const getNonce = require('./getNonce');
const setBlockHash = require('./setBlockHash');
const setCode = require('./setCode');

module.exports = function system (db: BaseDbInterface): PolkadotStateDb$System {
  return {
    getBlockHash: (block: BN | number): Uint8Array =>
      getBlockHash(db, block),
    getCode: (): Uint8Array =>
      getCode(db),
    getNonce: (publicKey: Uint8Array): BN =>
      getNonce(db, publicKey),
    setBlockHash: (block: BN | number, hash: Uint8Array): void =>
      setBlockHash(db, block, hash),
    setCode: (code: Uint8Array): void =>
      setCode(db, code)
  };
};
