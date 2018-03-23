// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

module.exports = function genesisState ({ chain: { genesis: { authorities, balances, code, validators } }, stateDb }: ChainState): void {
  stateDb.consensys.authorityCount.set(authorities.length);
  authorities.forEach((authority, index) => {
    stateDb.consensys.authority.set(index, authority);
  });

  stateDb.staking.validatorCount.set(validators.length);
  stateDb.session.valueCount.set(validators.length);
  validators.forEach((validator, index) => {
    stateDb.session.value.set(index, validator);
  });

  balances.forEach(({ accountId, balance }) => {
    stateDb.staking.balance.set(accountId, balance);
  });
  stateDb.system.code.set(code);

  stateDb.commit();
};
