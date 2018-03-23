// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type ChainDb$Block$BestHash = {
  get: () => Uint8Array,
  set: (hash: Uint8Array) => void
};

export type ChainDb$Block$BestNumber = {
  get: () => BN,
  set: (number: BN | number) => void
};

export type ChainDb$Block$Block = {
  get: (hash: Uint8Array) => Uint8Array,
  set: (hash: Uint8Array, block: Uint8Array) => void
};

export type ChainDb$Block = {
  bestHash: ChainDb$Block$BestHash,
  bestNumber: ChainDb$Block$BestNumber,
  block: ChainDb$Block$Block
};
