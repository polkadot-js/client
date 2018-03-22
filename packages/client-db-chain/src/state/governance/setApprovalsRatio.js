// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';

const BN = require('bn.js');

const { APPROVALS_RATIO } = require('./keys');

module.exports = function setApprovalsRatio (db: WrapDbInterface, ratio: BN | number): void {
  db.setBn32(APPROVALS_RATIO(), ratio);
};
