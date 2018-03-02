// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { DbState } from './types';

const clear = require('./clear');
const pairs = require('./pairs');

module.exports = function commit (self: DbState, values: Trie$Pairs): void {
  self.backend.commit(
    pairs(self).concat(values)
  );
  clear(self);
};
