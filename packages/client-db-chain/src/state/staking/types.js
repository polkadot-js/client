// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyBnValU8a, KeyNoneValBn, KeyU8aValBn } from '../../types';

export type ChainDb$State$Staking$Balance = KeyU8aValBn;

export type ChainDb$State$Staking$CurrentEra = KeyNoneValBn;

export type ChainDb$State$Staking$Intent = KeyBnValU8a;

export type ChainDb$State$Staking$IntentLength = KeyNoneValBn;

export type ChainDb$State$Staking$SessionsPerEra = KeyNoneValBn;

export type ChainDb$State$Staking$ValidatorCount = KeyNoneValBn;

export type ChainDb$State$Staking = {
  balance: ChainDb$State$Staking$Balance,
  currentEra: ChainDb$State$Staking$CurrentEra,
  intent: ChainDb$State$Staking$Intent,
  intentLength: ChainDb$State$Staking$IntentLength,
  sessionsPerEra: ChainDb$State$Staking$SessionsPerEra,
  validatorCount: ChainDb$State$Staking$ValidatorCount
}
