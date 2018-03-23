// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { WrapDbInterface } from '@polkadot/client-db/types';
import type { ChainDb$State$Governance } from './types';

const { kNv32 } = require('../../getset');

const keys = require('./keys');

module.exports = function governance (db: WrapDbInterface): ChainDb$State$Governance {
  return {
    approvalsRatio: kNv32(db, keys.APPROVALS_RATIO)
  };
};
