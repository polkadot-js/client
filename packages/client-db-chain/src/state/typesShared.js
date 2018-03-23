// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type IdWithU8a = {
  get: (id: BN | number) => Uint8Array,
  set: (id: BN | number, u8a: Uint8Array) => void
};

export type NoneWithBn = {
  get: () => BN,
  set: (length: BN | number) => void
}
