// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainDb$State$Staking$Balance = {
  get (publicKey: Uint8Array): BN,
  set (publicKey: Uint8Array, value: BN | number): void
}

export type ChainDb$State$Staking$CurrentEra = {
  set (era: BN | number): void,
}

export type ChainDb$State$Staking$Intent = {
  set (id: BN | number, publicKey: Uint8Array): void,
}

export type ChainDb$State$Staking$IntentLength = {
  set (length: BN | number): void,
}

export type ChainDb$State$Staking$SessionsPerEra = {
  set (count: BN | number): void
}

export type ChainDb$State$Staking$ValidatorCount = {
  set: (count: BN | number) => void
}

export type ChainDb$State$Staking = {
  balance: ChainDb$State$Staking$Balance,
  currentEra: ChainDb$State$Staking$CurrentEra,
  intent: ChainDb$State$Staking$Intent,
  intentLength: ChainDb$State$Staking$IntentLength,
  sessionsPerEra: ChainDb$State$Staking$SessionsPerEra,
  validatorCount: ChainDb$State$Staking$ValidatorCount
}
