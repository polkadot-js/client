// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv, RuntimeInterface$Trie } from '../types';

module.exports = function trie ({ l }: RuntimeEnv): RuntimeInterface$Trie {
  return {
    enumerated_trie_root: () => l.error('enumerated_trie_root not implemented'),
    storage_root: () => l.error('storage_root not implemented')
  };
};
