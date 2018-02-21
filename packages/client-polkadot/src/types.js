// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type PolkadotInterface$Session = {}

export type PolkadotInterface$Staking = {
  getBalance (accountId: Uint8Array): BN,
  setBalance (accountId: Uint8Array, BN): void
}

export type PolkadotInterface$System = {}

export type PolkadotInterface = {
  session: PolkadotInterface$Session,
  staking: PolkadotInterface$Staking,
  system: PolkadotInterface$System
}
