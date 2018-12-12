// Copyright 2017-2018 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { RuntimeEnv, RuntimeInterface$Storage } from '../types';

import data from './data';
import trie from './trie';

export default function storage (env: RuntimeEnv): RuntimeInterface$Storage {
  return {
    ...data(env),
    ...trie(env)
  };
}
