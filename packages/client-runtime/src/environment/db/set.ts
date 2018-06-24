// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pair } from '@polkadot/util-triehash/types';
import { DbState } from './types';

export default function set ({ pending }: DbState, k: Uint8Array, v: Uint8Array): void {
  pending[k.toString()] = ({
    k: k.slice(),
    v: v.slice()
  } as Trie$Pair);
}
