// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseDbInterface } from '@polkadot/client-db/types';
import type { Memory$Storage } from '@polkadot/client-db/memory/types';
import type { Trie$Pairs } from '@polkadot/util-triehash/types';

const pairs = require('./pairs');

module.exports = function commit (pending: Memory$Storage, backend: BaseDbInterface, values: Trie$Pairs): void {
  backend.commit(
    pairs(pending).concat(values)
  );
};
