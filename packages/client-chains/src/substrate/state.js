// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

module.exports = function genesisState ({ chain: { genesis: { authorities, balances, code, validators } }, stateDb }: ChainState): void {
  stateDb.consensus.authorityCount.set(authorities.length);
  authorities.forEach((authority, index) => {
    stateDb.consensus.authority.set(authority, index);
  });

  stateDb.staking.validatorCount.set(validators.length);
  stateDb.session.validatorCount.set(validators.length);
  validators.forEach((validator, index) => {
    stateDb.session.validator.set(validator, index);
  });

  balances.forEach(({ accountId, balance }) => {
    stateDb.staking.freeBalanceOf.set(balance, accountId);
  });
  stateDb.consensus.code.set(code);

  stateDb.db.commit();
};
