// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { IdWithU8a, NoneWithBn } from '../typesShared';

export type ChainDb$State$Staking$Balance = {
  get (publicKey: Uint8Array): BN,
  set (publicKey: Uint8Array, value: BN | number): void
}

export type ChainDb$State$Staking$CurrentEra = NoneWithBn;

export type ChainDb$State$Staking$Intent = IdWithU8a;

export type ChainDb$State$Staking$IntentLength = NoneWithBn;

export type ChainDb$State$Staking$SessionsPerEra = NoneWithBn;

export type ChainDb$State$Staking$ValidatorCount = NoneWithBn;

export type ChainDb$State$Staking = {
  balance: ChainDb$State$Staking$Balance,
  currentEra: ChainDb$State$Staking$CurrentEra,
  intent: ChainDb$State$Staking$Intent,
  intentLength: ChainDb$State$Staking$IntentLength,
  sessionsPerEra: ChainDb$State$Staking$SessionsPerEra,
  validatorCount: ChainDb$State$Staking$ValidatorCount
}
