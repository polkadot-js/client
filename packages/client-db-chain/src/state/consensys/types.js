// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { IdWithU8a, NoneWithBn } from '../typesShared';

export type ChainDb$State$Consensys$Authority = IdWithU8a;

export type ChainDb$State$Consensys$AuthorityCount = NoneWithBn;

export type ChainDb$State$Consensys = {
  authority: ChainDb$State$Consensys$Authority,
  authorityCount: ChainDb$State$Consensys$AuthorityCount
}
