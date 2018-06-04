// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair } from '@polkadot/util-triehash/types';
import type { DbState } from './types';

module.exports = function set ({ pending }: DbState, k: Uint8Array, v: Uint8Array): void {
  pending[k] = ({
    k: k.slice(),
    v: v.slice()
  }: Trie$Pair);
};
