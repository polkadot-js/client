// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { IdWithU8a } from '../typesShared';

export type ChainDb$State$System$BlockHash = IdWithU8a;

export type ChainDb$State$System$Code = {
  get: () => Uint8Array,
  set: (code: Uint8Array) => void
};

export type ChainDb$State$System$Nonce = {
  get: (publicKey: Uint8Array) => BN,
  set: (publicKey: Uint8Array, nonce: number | BN) => void
};

export type ChainDb$State$System = {
  blockHash: ChainDb$State$System$BlockHash,
  code: ChainDb$State$System$Code,
  nonce: ChainDb$State$System$Nonce
};
