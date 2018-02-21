// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type PolkadotInterface$Staking = {
  getBalance (accountId: Uint8Array): BN,
  setBalance (accountId: Uint8Array, BN): void
}

export type PolkadotInterface = PolkadotInterface$Staking;
