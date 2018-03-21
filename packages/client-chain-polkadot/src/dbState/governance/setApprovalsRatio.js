// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');
const key = require('@polkadot/client-db/key');

const { APPROVALS_RATIO } = require('./prefix');

module.exports = function setApprovalsRatio (db: WrapDbInterface, ratio: BN | number): void {
  db.setBn(key(APPROVALS_RATIO), ratio, 32);
};
