// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyNoneValBn, KeyNoneValU8a, KeyU8aValU8a } from '../types';

export type ChainDb$Block$BestHash = KeyNoneValU8a;

export type ChainDb$Block$BestNumber = KeyNoneValBn;

export type ChainDb$Block$Block = KeyU8aValU8a;

export type ChainDb$Block = {
  bestHash: ChainDb$Block$BestHash,
  bestNumber: ChainDb$Block$BestNumber,
  block: ChainDb$Block$Block
};
