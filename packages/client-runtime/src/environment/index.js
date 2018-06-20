// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { TrieDb } from '@polkadot/util-triedb/types';
import type { RuntimeEnv } from '../types';

import logger from '@polkadot/util/logger';

import envDb from './db';
import envHeap from './heap';

const l = logger('runtime');

export default function environment (stateDb: TrieDb): RuntimeEnv {
  return {
    l,
    db: envDb(stateDb),
    heap: envHeap()
  };
}
