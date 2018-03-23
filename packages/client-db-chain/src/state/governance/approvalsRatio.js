// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Governance$ApprovalsRatio } from './types';

const { APPROVALS_RATIO } = require('./keys');

module.exports = function setApprovalsRatio (db: WrapDbInterface): ChainDb$State$Governance$ApprovalsRatio {
  return {
    get: (): BN =>
      db.getBn32(APPROVALS_RATIO()),
    set: (ratio: BN | number): void =>
      db.setBn32(APPROVALS_RATIO(), ratio)
  };
};
