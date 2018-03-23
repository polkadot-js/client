// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyBnValU8a, KeyNoneValBn } from '../../types';

export type ChainDb$State$Consensys$Authority = KeyBnValU8a;

export type ChainDb$State$Consensys$AuthorityCount = KeyNoneValBn;

export type ChainDb$State$Consensys = {
  authority: ChainDb$State$Consensys$Authority,
  authorityCount: ChainDb$State$Consensys$AuthorityCount
}
