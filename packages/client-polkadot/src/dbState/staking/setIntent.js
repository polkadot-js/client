// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const key = require('../key');
const { INTENT_WILL } = require('./prefix');

module.exports = function setIntent (db: BaseDbInterface, id: BN | number, publicKey: Uint8Array): void {
  db.set(
    key(INTENT_WILL, bnToU8a(id, 32, true)),
    publicKey
  );
};
