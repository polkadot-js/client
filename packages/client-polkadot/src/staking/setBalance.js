// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const key = require('../key');
const { BALANCE_OF } = require('./prefix');

module.exports = function setBalance (db: BaseDbInterface, publicKey: Uint8Array, value: BN | number): void {
  db.set(
    key(BALANCE_OF, publicKey),
    bnToU8a(value, 64, true)
  );
};
