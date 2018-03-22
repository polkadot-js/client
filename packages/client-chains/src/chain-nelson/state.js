// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

const substrateState = require('../substrate/state');

module.exports = function state (self: ChainState): void {
  const { chain: { config: { genesis: { params: { approvalRatio, sessionLength, sessionsPerEra } } } }, stateDb } = self;

  stateDb.governance.setApprovalsRatio(approvalRatio);
  stateDb.session.setLength(sessionLength);
  stateDb.staking.setCurrentEra(0);
  stateDb.staking.setIntentLength(0);
  stateDb.staking.setSessionsPerEra(sessionsPerEra);

  substrateState(self);
};
