// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/trie-hash/types';
import { DbState } from './types';

export default function pairs ({ backend, pending }: DbState): Trie$Pairs {
  const backendPairs = backend
    ? backend.pairs()
    : [];
  const pendingKeys = Object.keys(pending);
  const deletedKeys = pendingKeys.filter((k) =>
    pending[k].v === null
  );
  const pendingPairs = Object.values(pending).filter(({ v }) =>
    v !== null
  );

  return backendPairs
    .filter(({ k }) =>
      deletedKeys.indexOf(k.toString()) === -1
    )
    .concat(pendingPairs as Trie$Pairs);
}
