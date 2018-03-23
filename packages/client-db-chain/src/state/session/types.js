// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainDb$State$Session$Length = {
  get: () => BN,
  set: (length: BN | number) => void
};

export type ChainDb$State$Session$Value = {
  get: (id: BN | number) => Uint8Array,
  set: (id: BN | number, publicKey: Uint8Array) => void
};

export type ChainDb$State$Session$ValueCount = {
  get: () => BN,
  set: (count: BN | number) => void
}

export type ChainDb$State$Session = {
  length: ChainDb$State$Session$Length,
  value: ChainDb$State$Session$Value,
  valueCount: ChainDb$State$Session$ValueCount
};
