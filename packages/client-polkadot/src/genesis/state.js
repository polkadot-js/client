// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigType } from '@polkadot/client-chains/types';
import type { PolkadotDb } from '../types';

module.exports = function genesisState ({ authorities, balances, code, params, validators }: ChainConfigType, db: PolkadotDb): void {
  db.consensys.setAuthorityCount(authorities.length);
  authorities.forEach((authority, index) => {
    db.consensys.setAuthority(index, authority);
    db.consensys.setAuthority(index, authority, true);
  });
  db.governance.setApprovalsRatio(params.approvalRatio);
  db.session.setLength(params.sessionLength);
  db.session.setValueCount(validators.length);
  validators.forEach((validator, index) => {
    db.session.setValue(index, validator);
  });
  balances.forEach(({ accountId, balance }) => {
    db.staking.setBalance(accountId, balance);
  });
  db.staking.setCurrentEra(0);
  db.staking.setIntentLength(0);
  db.staking.setSessionsPerEra(params.sessionsPerEra);
  db.staking.setValidatorCount(validators.length);
  db.system.setCode(code);

  db.commit();
};
