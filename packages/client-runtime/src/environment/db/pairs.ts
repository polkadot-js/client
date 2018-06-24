// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/util-triehash/types';
import { DbState } from './types';

export default function pairs ({ backend, pending }: DbState): Trie$Pairs {
  const pendingKeys = Object.keys(pending);
  // @ts-ignore yes, we strip nulls, so all ok here
  const pendingPairs: Trie$Pairs = pendingKeys
    .filter((k) => pending[k].v !== null)
    .map((k) => pending[k]);

  return (backend ? backend.pairs() : []).concat(pendingPairs);
}
