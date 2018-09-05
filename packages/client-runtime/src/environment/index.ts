// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { TrieDb } from '@polkadot/trie-db/types';
import { RuntimeEnv } from '../types';

import logger from '@polkadot/util/logger';

import Heap from './heap';

const l = logger('runtime');

export default function environment (db: TrieDb): RuntimeEnv {
  return {
    l,
    db,
    heap: new Heap()
  };
}
