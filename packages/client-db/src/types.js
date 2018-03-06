// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';

export type DbPathPrefix = 'database';

export type DbConfig$ = 'disk' | 'memory';

export type DbConfig = {
  path: string,
  type: DbConfig$
};

export type BaseDbInterface = {
  clear (): void,
  commit (values?: Trie$Pairs): void,
  del (key: Uint8Array): void,
  isEmpty: () => boolean,
  get (key: Uint8Array): Uint8Array,
  pairs: () => Trie$Pairs,
  set (key: Uint8Array, value: Uint8Array): void
}
