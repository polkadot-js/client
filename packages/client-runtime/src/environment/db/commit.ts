// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/util-triehash/types';
import { DbState } from './types';

import clear from './clear';
import pairs from './pairs';

export default function commit (self: DbState, values: Trie$Pairs): void {
  self.backend.commit(
    pairs(self).concat(values)
  );
  clear(self);
}
