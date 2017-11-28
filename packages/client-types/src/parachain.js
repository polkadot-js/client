// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { TAccountID, TBalance, Tbytes, THash } from './base';

export type TParachainState$BalanceDownload = [TBalance, Tbytes];

export type TParachainState$EgressRoot = THash;

export type TParachainState = {
  head_data: Tbytes,
  balance: TBalance,
  user_balances: {
    [TAccountID]: TBalance
  },
  balance_downloads: {
    [TAccountID]: TParachainState$BalanceDownload
  },
  egress_roots: Array<TParachainState$EgressRoot>
};
