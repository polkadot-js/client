// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainDb$State$Governance$ApprovalsRatio = {
  get: () => BN,
  set: (ratio: BN | number) => void
};

export type ChainDb$State$Governance = {
  approvalsRatio: ChainDb$State$Governance$ApprovalsRatio
}
