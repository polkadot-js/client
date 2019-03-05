// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/trie-db/types';
import { RuntimeEnv } from '../types';

import { logger } from '@polkadot/util';

import Heap from './heap';

const l = logger('runtime');

export default function environment (db: TrieDb): RuntimeEnv {
  return {
    l,
    db,
    heap: new Heap()
  };
}
