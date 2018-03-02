// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';

const bnToU8a = require('@polkadot/util/bn/toU8a');

const key = require('../dbstate/key');
const { LATEST_HASH, LATEST_NUMBER } = require('./prefix');

module.exports = function setLatest (db: BaseDbInterface, number: BN | number, hash: Uint8Array): void {
  db.set(
    key(LATEST_NUMBER),
    bnToU8a(number, 64)
  );
  db.set(
    key(LATEST_HASH),
    hash
  );
};
