// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow
/* eslint camelcase: 0 */

import type { RuntimeEnv, RuntimeInterface$Storage } from '../types';

import data from './data';
import trie from './trie';

export default function storage (env: RuntimeEnv): RuntimeInterface$Storage {
  const { clear_storage, get_allocated_storage, get_storage_into, set_storage } = data(env);
  const { enumerated_trie_root, storage_root } = trie(env);

  return {
    clear_storage,
    get_allocated_storage,
    get_storage_into,
    set_storage,
    enumerated_trie_root,
    storage_root
  };
}
