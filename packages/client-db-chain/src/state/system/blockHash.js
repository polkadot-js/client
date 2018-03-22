// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

type BlockHash = {
  get: (block: BN | number) => Uint8Array,
  set: (block: BN | number, hash: Uint8Array) => void
};

const bnToU8a = require('@polkadot/util/bn/toU8a');

const { BLOCK_HASH_AT } = require('./keys');

module.exports = function blockHash (db: WrapDbInterface): BlockHash {
  return {
    get: (block: BN | number): Uint8Array =>
      db.get(
        BLOCK_HASH_AT(bnToU8a(block, 64, true))
      ),
    set: (block: BN | number, hash: Uint8Array): void =>
      db.set(
        BLOCK_HASH_AT(bnToU8a(block, 64, true)),
        hash
      )
  };
};
