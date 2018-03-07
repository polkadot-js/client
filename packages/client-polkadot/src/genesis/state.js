// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { PolkadotState } from '../types';

module.exports = function genesisState ({ blockDb, chain: { authorities, balances, code, params, validators }, stateDb }: PolkadotState): void {
  stateDb.consensys.setAuthorityCount(authorities.length);
  authorities.forEach((authority, index) => {
    stateDb.consensys.setAuthority(index, authority);
    stateDb.consensys.setAuthority(index, authority, true);
  });

  stateDb.governance.setApprovalsRatio(params.approvalRatio);

  stateDb.session.setLength(params.sessionLength);
  stateDb.session.setValueCount(validators.length);
  validators.forEach((validator, index) => {
    stateDb.session.setValue(index, validator);
  });

  balances.forEach(({ accountId, balance }) => {
    stateDb.staking.setBalance(accountId, balance);
  });
  stateDb.staking.setCurrentEra(0);
  stateDb.staking.setIntentLength(0);
  stateDb.staking.setSessionsPerEra(params.sessionsPerEra);
  stateDb.staking.setValidatorCount(validators.length);
  stateDb.system.setCode(code);

  stateDb.commit();
};
