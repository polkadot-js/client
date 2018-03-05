// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { DbState } from './types';

module.exports = function pairs ({ backend, pending }: DbState): Trie$Pairs {
  return (backend ? backend.pairs() : [])
    .concat(
      Object
        .keys(pending)
        .filter((k) => pending[k].v)
        .map((k) => pending[k])
    );
};
