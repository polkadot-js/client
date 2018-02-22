// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { PolkadotDb$Governance } from '../../types';

const setApprovalsRequired = require('./setApprovalsRequired');

module.exports = function governance (db: BaseDbInterface): PolkadotDb$Governance {
  return {
    setApprovalsRequired: (count: BN | number): void =>
      setApprovalsRequired(db, count)
  };
};
