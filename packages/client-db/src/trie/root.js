// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from './types';

const asNibbles = require('./util/asNibbles');
const genRoot = require('./util/genRoot');
const pairsUniq = require('./util/pairsUniq');

module.exports = function trieRoot (pairs: Trie$Pairs): string {
  return genRoot(
    pairsUniq(pairs).map(({ k, v }) => ({
      k: asNibbles(k),
      v
    }))
  );
};
