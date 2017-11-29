// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BalanceType, BytesType, HashType } from './base';

export type ParachainStateType$BalanceDownload = [BalanceType, BytesType];

export type ParachainStateType$EgressRoot = HashType;

export type ParachainStateType = {
  head_data: BytesType,
  balance: BalanceType,
  user_balances: {
    [AccountIdType]: BalanceType
  },
  balance_downloads: {
    [AccountIdType]: ParachainStateType$BalanceDownload
  },
  egress_roots: Array<ParachainStateType$EgressRoot>
};
