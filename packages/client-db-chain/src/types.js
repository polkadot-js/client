// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';

export type KeyBnValU8a = {
  get: (key: BN | number) => Uint8Array,
  set: (key: BN | number, value: Uint8Array) => void
};

export type KeyNoneValBn = {
  get: () => BN,
  set: (value: BN | number) => void
};

export type KeyNoneValU8a = {
  get: () => Uint8Array,
  set: (value: Uint8Array) => void
};

export type KeyU8aValBn = {
  get (key: Uint8Array): BN,
  set (key: Uint8Array, value: BN | number): void
};

export type KeyU8aValU8a = {
  get: (key: Uint8Array) => Uint8Array,
  set: (key: Uint8Array, value: Uint8Array) => void
};
