// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');
const bnToU8a = require('@polkadot/util/bn/toU8a');

const { APPROVALS_RATIO } = require('./prefix');

module.exports = function setApprovalsRatio (db: BaseDbInterface, ratio: BN | number): void {
  db.set(
    key(APPROVALS_RATIO),
    bnToU8a(ratio, 32, true)
  );
};
