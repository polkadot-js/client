// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainState } from '../types';

module.exports = function genesisState ({ chain: { genesis: { authorities, balances, code, validators } }, stateDb }: ChainState): void {
  stateDb.consensus.authorityCount.setn(authorities.length);
  authorities.forEach((authority, index) => {
    stateDb.consensus.authority.set(authority, index);
    stateDb.consensus['authority(unhashed)'].set(authority, index);
  });

  stateDb.staking.validatorCount.setn(validators.length);
  stateDb.session.valueCount.setn(validators.length);
  validators.forEach((validator, index) => {
    stateDb.session.value.set(validator, index);
  });

  balances.forEach(({ accountId, balance }) => {
    stateDb.staking.balanceOf.setn(balance, accountId);
  });
  stateDb.system.code.set(code);

  stateDb.commit();
};
