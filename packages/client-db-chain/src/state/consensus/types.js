// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyBnValU8a, KeyNoneValBn } from '../../types';

export type ChainDb$State$Consensus$Authority = KeyBnValU8a;

export type ChainDb$State$Consensus$AuthorityCount = KeyNoneValBn;

export type ChainDb$State$Consensus = {
  authority: ChainDb$State$Consensus$Authority,
  authorityCount: ChainDb$State$Consensus$AuthorityCount
}
