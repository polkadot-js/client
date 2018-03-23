// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$System$BlockHash } from './types';

const bnToU8a = require('@polkadot/util/bn/toU8a');

const { BLOCK_HASH_AT } = require('./keys');

function key (block: BN | number): Uint8Array {
  return BLOCK_HASH_AT(bnToU8a(block, 64, true));
}

module.exports = function blockHash (db: WrapDbInterface): ChainDb$State$System$BlockHash {
  return {
    get: (block: BN | number): Uint8Array =>
      db.get(key(block)),
    set: (block: BN | number, hash: Uint8Array): void =>
      db.set(key(block), hash)
  };
};
