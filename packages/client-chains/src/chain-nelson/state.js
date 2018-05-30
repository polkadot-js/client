// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const substrateState = require('../substrate/state');

module.exports = function state (self: ChainState): void {
  const { chain: { genesis: { params: { approvalRatio, sessionLength, sessionsPerEra } } }, stateDb } = self;

  stateDb.governance.approvalsRatio.set(approvalRatio);
  stateDb.session.length.set(sessionLength);
  stateDb.staking.currentEra.set(0);
  stateDb.staking.intentLength.set(0);
  stateDb.staking.sessionsPerEra.set(sessionsPerEra);

  substrateState(self);
};
