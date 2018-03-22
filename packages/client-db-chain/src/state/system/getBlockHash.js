// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';

const key = require('@polkadot/client-db/key');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const { BLOCK_HASH_AT } = require('./prefix');

module.exports = function getBlockHash (db: WrapDbInterface, block: BN | number): Uint8Array {
  return db.get(
    key(BLOCK_HASH_AT, bnToU8a(block, 64, true))
  );
};