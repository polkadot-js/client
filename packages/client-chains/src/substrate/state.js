// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

module.exports = function genesisState ({ chain: { genesis: { authorities, balances, code, validators } }, stateDb }: ChainState): void {
  stateDb.consensys.setAuthorityCount(authorities.length);
  authorities.forEach((authority, index) => {
    stateDb.consensys.setAuthority(index, authority);
  });

  stateDb.staking.setValidatorCount(validators.length);
  stateDb.session.setValueCount(validators.length);
  validators.forEach((validator, index) => {
    stateDb.session.setValue(index, validator);
  });

  balances.forEach(({ accountId, balance }) => {
    stateDb.staking.setBalance(accountId, balance);
  });
  stateDb.system.setCode(code);

  stateDb.commit();
};
