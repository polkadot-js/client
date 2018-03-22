// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const { BLOCK_HASH_AT } = require('./keys');

module.exports = function setBlockHash (db: WrapDbInterface, block: BN | number, hash: Uint8Array): void {
  db.set(
    BLOCK_HASH_AT(bnToU8a(block, 64, true)),
    hash
  );
};
