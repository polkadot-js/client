// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '../types';
import type { Trie$Pairs } from '../trie/types';
import type { Memory$Storage } from '../memory/types';

module.exports = function pairs (pending: Memory$Storage, backend?: BaseDbInterface): Trie$Pairs {
  return (backend ? backend.pairs() : [])
    .concat(
      Object
        .keys(pending)
        .map((k) => pending[k])
    );
};
