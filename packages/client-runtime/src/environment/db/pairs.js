// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { DbState } from './types';

module.exports = function pairs ({ backend, pending }: DbState): Trie$Pairs {
  // flowlint-next-line unclear-type:off
  const pendingKeys = ((Object.keys(pending): any): Array<Uint8Array>);
  const pendingPairs: Trie$Pairs = pendingKeys
    .filter((k) => pending[k].v !== null)
    // $FlowFixMe nulls have been filtered
    .map((k) => pending[k]);

  return (backend ? backend.pairs() : []).concat(pendingPairs);
};
