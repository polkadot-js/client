// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { IdWithU8a, NoneWithBn } from '../typesShared';

export type ChainDb$State$Session$Length = NoneWithBn;

export type ChainDb$State$Session$Value = IdWithU8a;

export type ChainDb$State$Session$ValueCount = NoneWithBn;

export type ChainDb$State$Session = {
  length: ChainDb$State$Session$Length,
  value: ChainDb$State$Session$Value,
  valueCount: ChainDb$State$Session$ValueCount
};
