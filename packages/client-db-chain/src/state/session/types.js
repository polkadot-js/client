// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { KeyBnValU8a, KeyNoneValBn } from '../../types';

export type ChainDb$State$Session$Length = KeyNoneValBn;

export type ChainDb$State$Session$Val = KeyBnValU8a;

export type ChainDb$State$Session$ValCount = KeyNoneValBn;

export type ChainDb$State$Session = {
  length: ChainDb$State$Session$Length,
  value: ChainDb$State$Session$Val,
  valueCount: ChainDb$State$Session$ValCount
};
