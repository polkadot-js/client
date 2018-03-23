// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type BN from 'bn.js';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';

export type DbKeygen = (key?: Uint8Array) => Uint8Array;

export type DbPathPrefix = 'database';

export type DbConfig$Type = 'disk' | 'memory';

export type DbConfig = {
  path: string,
  type: DbConfig$Type
};

export type BaseDbInterface = {
  clear: () => void,
  commit: (values?: Trie$Pairs) => void,
  del: (key: Uint8Array) => void,
  isEmpty: () => boolean,
  get: (key: Uint8Array) => Uint8Array,
  pairs: () => Trie$Pairs,
  set: (key: Uint8Array, value: Uint8Array) => void
}

export type WrapDbInterface = BaseDbInterface & {
  getBn: (bitLength?: number) =>
    (key: Uint8Array) => BN,
  setBn: (bitLength?: number) =>
    (key: Uint8Array, value: BN | number) => void
};
