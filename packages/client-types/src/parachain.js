// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { AccountIdType, BalanceType, BytesType, HashType } from './base';

export type ParachainStateType$BalanceDownload = [BalanceType, BytesType];

export type ParachainStateType$EgressRoot = HashType;

export type ParachainStateType = {
  headData: BytesType,
  balance: BalanceType,
  userBalances: {
    [AccountIdType]: BalanceType
  },
  balanceDownloads: {
    [AccountIdType]: ParachainStateType$BalanceDownload
  },
  egressRoots: Array<ParachainStateType$EgressRoot>
};
