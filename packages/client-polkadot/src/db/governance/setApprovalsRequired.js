// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const key = require('../key');
const { APPROVALS_REQUIRED } = require('./prefix');

module.exports = function setApprovalsRequired (db: BaseDbInterface, count: BN | number): void {
  db.set(
    key(APPROVALS_REQUIRED),
    bnToU8a(count, 32, true)
  );
};
